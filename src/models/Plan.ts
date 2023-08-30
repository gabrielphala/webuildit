import { SQLifier, SQLDate } from "sqlifier"

export default new (class Plan extends SQLifier {
    constructor() {
        super();

        this.schema('plan', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            user_id: { type: 'int', ref: 'user' },
            name: { type: 'varchar', length: 50 },
            plan_for: { type: 'varchar', length: 30 },
            plan_no: { type: 'varchar', length: 8 },
            length_area: { type: 'int', length: 11 },
            height_area: { type: 'int', length: 11 },
            brick_count: { type: 'int', length: 11 },
            cement: { type: 'int', length: 11 },
            sand: { type: 'int', length: 11 },
            window_count: { type: 'int', length: 4, default: 0 },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})