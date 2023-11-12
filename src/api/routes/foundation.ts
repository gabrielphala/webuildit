import { Application } from "express";

import baseController from "../controllers/base";
import foundationService from "../../services/Foundation"

export default (app: Application) => {
    app.post('/foundation/add', baseController.wrap_with_store(foundationService.add))
    app.post('/foundation/get/by/plan/unique-id/:plan_no', baseController.wrap_with_request(foundationService.view))
}