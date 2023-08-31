import { Application } from "express";

import baseController from "../controllers/base";
import planService from "../../services/Plan"

export default (app: Application) => {
    app.post('/plan/add', baseController.wrap_with_store(planService.add))
    app.post('/plan/remove', baseController.wrap_with_store(planService.removePlan))
    app.post('/plan/get/by/unique-id/:planNo', baseController.wrap_with_request(planService.getPlanByUniqueId))
    app.post('/plans/get/by/user', baseController.wrap_with_store(planService.getUserPlans))
}