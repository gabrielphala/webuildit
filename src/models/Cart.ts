import { SQLifier, SQLDate } from "sqlifier"

export default new (class Cart extends SQLifier {
    constructor() {
        super();

        this.schema('cart', {
            cart_item_id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            user_id: { type: 'int', ref: 'user', refField: 'user_id' },
            item: { type: 'varchar', length: 50 },
            price: { type: 'float' },
            image: { type: 'varchar', length: 255 },
            quantity: { type: 'int', default: 1 },
            is_removed: { type: 'boolean', default: false }
        })
    }
})