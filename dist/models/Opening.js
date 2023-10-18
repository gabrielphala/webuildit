"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Opening extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('material', {
            material_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            kind: { type: 'varchar', length: 11 },
            length_area: { type: 'int', length: 11 },
            height_area: { type: 'int', length: 11 },
            bricks_saved: { type: 'int', length: 11 },
            cement_saved: { type: 'int', length: 11 },
            sand_saved: { type: 'int', length: 11 },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=Opening.js.map