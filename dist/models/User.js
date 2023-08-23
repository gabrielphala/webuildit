"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class User extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('user', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            firstname: { type: 'varchar', length: 55 },
            lastname: { type: 'varchar', length: 55 },
            email: { type: 'varchar', length: 50 },
            password: { type: 'varchar', length: 250 },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        });
    }
    getByEmail(email) {
        return this.findOne({
            condition: { email, is_removed: false }
        });
    }
});
//# sourceMappingURL=User.js.map