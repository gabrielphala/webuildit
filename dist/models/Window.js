"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Window extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('window', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan' },
            name: { type: 'varchar', length: 50 },
            area: { type: 'int', length: 11 },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=Window.js.map