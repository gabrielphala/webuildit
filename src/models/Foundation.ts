import { SQLifier, SQLDate } from "sqlifier"

export default new (class Foundation extends SQLifier {
    constructor() {
        super();

        this.schema('foundation', {
            founation_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            perimeter: { type: 'float', length: '11,2' },
            height: { type: 'float', length: '11,2' },
            floor_area: { type: 'float', length: '11,2' },
            concrete: { type: 'float', length: '11,2' },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})