"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Opening extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('material', {
            material_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            quantity: { type: 'int', default: 1 },
            kind: { type: 'varchar', length: 11 },
            name: { type: 'varchar', length: 20 },
            length_area: { type: 'float', length: '11,2' },
            height_area: { type: 'float', length: '11,2' },
            bricks_saved: { type: 'int', length: 11 },
            cement_saved: { type: 'float', length: '11,2' },
            sand_saved: { type: 'float', length: '11,2' },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=Opening.js.map