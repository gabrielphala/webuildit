import { Application } from "express";

import baseController from "../controllers/base";
import userService from "../../services/User"

export default (app: Application) => {
    app.post('/sign-out', baseController.signOut)
    app.post('/sign-up', baseController.wrap(userService.signUp))
    app.post('/sign-in', baseController.wrap(userService.signIn))

    app.post('/user/get/by/session', baseController.wrap_with_store(userService.getBySession))
    app.post('/user/update', baseController.wrap_with_store(userService.updateUser))
    app.post('/user/delete', baseController.wrap_with_store(userService.deleteAccount))
}