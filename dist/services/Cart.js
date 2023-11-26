"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = __importDefault(require("../models/Cart"));
class CartServices {
    static async add(wrapRes, body, { userInfo }) {
        try {
            const { image, item, price } = body;
            Cart_1.default.insert({
                item,
                price,
                image,
                user_id: userInfo.user_id
            });
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async getAllProducts(wrapRes, body, { userInfo }) {
        try {
            wrapRes.products = await Cart_1.default.find({
                condition: {
                    user_id: userInfo.user_id,
                    is_removed: false
                }
            });
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async increase(wrapRes, body) {
        try {
            const { id } = body;
            const product = await Cart_1.default.findOne({
                condition: {
                    cart_item_id: id
                }
            });
            product.quantity++;
            product.save();
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async decrease(wrapRes, body) {
        const { id } = body;
        const product = await Cart_1.default.findOne({
            condition: {
                cart_item_id: id
            }
        });
        if (product.quantity <= 1) {
            product.is_removed = 1;
            product.quantity--;
            product.save();
            return wrapRes;
        }
        product.quantity--;
        product.save();
        return wrapRes;
    }
    static async clear(wrapRes, body, { userInfo }) {
        const product = await Cart_1.default.update({
            user_id: userInfo.user_id
        }, {
            is_removed: true
        });
        return wrapRes;
    }
}
exports.default = CartServices;
;
//# sourceMappingURL=Cart.js.map