import { SQLifier, SQLDate } from "sqlifier"

export default new (class Opening extends SQLifier {
    constructor() {
        super();

        this.schema('roof', {
            roof_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            kind: { type: 'varchar', length: 11 },
            tiles: { type: 'float', length: '11,2' },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})