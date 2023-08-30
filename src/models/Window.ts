import { SQLifier, SQLDate } from "sqlifier"

export default new (class Window extends SQLifier {
    constructor() {
        super();

        this.schema('window', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan' },
            name: { type: 'varchar', length: 50 },
            area: { type: 'int', length: 11 },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})