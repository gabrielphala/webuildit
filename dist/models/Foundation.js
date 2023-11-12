"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Foundation extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('foundation', {
            founation_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            wall_length: { type: 'float' },
            wall_height: { type: 'float' },
            floor_area: { type: 'float' },
            brick_count: { type: 'float' },
            cement: { type: 'float' },
            sand: { type: 'float' },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=Foundation.js.map