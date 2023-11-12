import { SQLifier, SQLDate } from "sqlifier"

export default new (class Opening extends SQLifier {
    constructor() {
        super();

        this.schema('material', {
            material_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            plan_id: { type: 'int', ref: 'plan', refField: 'plan_id' },
            quantity: { type: 'int', default: 1 },
            kind: { type: 'varchar', length: 11 },
            name: { type: 'varchar', length: 20 },
            length_area: { type: 'float' },
            height_area: { type: 'float' },
            bricks_saved: { type: 'float' },
            cement_saved: { type: 'float' },
            sand_saved: { type: 'float' },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }
})