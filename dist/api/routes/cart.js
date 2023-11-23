"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Cart_1 = __importDefault(require("../../services/Cart"));
exports.default = (app) => {
    app.post('/cart/add', base_1.default.wrap_with_store(Cart_1.default.add));
    app.post('/cart/get/all', base_1.default.wrap_with_store(Cart_1.default.getAllProducts));
    app.post('/cart/increase', base_1.default.wrap(Cart_1.default.increase));
    app.post('/cart/decrease', base_1.default.wrap(Cart_1.default.decrease));
    app.post('/cart/clear', base_1.default.wrap_with_store(Cart_1.default.clear));
};
//# sourceMappingURL=cart.js.map