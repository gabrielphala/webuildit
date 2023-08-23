import { SQLifier, SQLDate } from "sqlifier"

export default new (class User extends SQLifier {
    constructor() {
        super();

        this.schema('user', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            firstname: { type: 'varchar', length: 55 },
            lastname: { type: 'varchar', length: 55 },
            email: { type: 'varchar', length: 50 },
            password: { type: 'varchar', length: 250 },
            date_created: { type: 'datetime', default: SQLDate.now },
            is_removed: { type: 'boolean', default: false }
        })
    }

    getByEmail (email: string) {
        return this.findOne({
            condition: { email, is_removed: false }
        })
    }
})