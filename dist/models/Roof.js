"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Opening extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('roof', {
            roof_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            kind: { type: 'varchar', length: 11 },
            tiles: { type: 'float' },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=Roof.js.map