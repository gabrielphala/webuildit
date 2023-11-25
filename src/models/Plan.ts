import { SQLifier, SQLDate } from "sqlifier"

export default new (class Plan extends SQLifier {
    constructor() {
        super();

        this.schema('plan', {
            plan_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            user_id: { type: 'int', ref: 'user', refField: 'user_id' },
            name: { type: 'varchar', length: 50 },
            plan_for: { type: 'varchar', length: 30 },
            plan_no: { type: 'varchar', length: 8 },
            length_area: { type: 'float', length: '11,2' },
            height_area: { type: 'float', length: '11,2' },
            brick_count: { type: 'int' },
            cement: { type: 'float', length: '11,2' },
            sand: { type: 'float', length: '11,2' },
            window_count: { type: 'int', length: 4, default: 0 },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})