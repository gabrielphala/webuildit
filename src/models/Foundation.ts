import { SQLifier, SQLDate } from "sqlifier"

export default new (class Foundation extends SQLifier {
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
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})