import { SQLifier, SQLDate } from "sqlifier"

export default new (class Opening extends SQLifier {
    constructor() {
        super();

        this.schema('opening', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan' },
            kind: { type: 'varchar', length: 11 },
            length_area: { type: 'int', length: 11 },
            height_area: { type: 'int', length: 11 },
            bricks_saved: { type: 'int', length: 11 },
            cement_saved: { type: 'int', length: 11 },
            sand_saved: { type: 'int', length: 11 },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})