import { Application } from "express";

import baseController from "../controllers/base";
import CartServices from "../../services/Cart";

export default (app: Application) => {
    app.post('/cart/add', baseController.wrap_with_store(CartServices.add))
    app.post('/cart/get/all', baseController.wrap_with_store(CartServices.getAllProducts))
    app.post('/cart/increase', baseController.wrap(CartServices.increase))
    app.post('/cart/decrease', baseController.wrap(CartServices.decrease))
    app.post('/cart/clear', baseController.wrap_with_store(CartServices.clear))
}