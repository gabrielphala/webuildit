import { Application } from "express";

import baseController from "../controllers/base";
import openingService from "../../services/Opening"

export default (app: Application) => {
    app.post('/opening/add', baseController.wrap_with_store(openingService.add))
    app.post('/opening/remove', baseController.wrap_with_store(openingService.removeOpening))
    app.post('/openings/get/by/plan-id/:planId', baseController.wrap_with_request(openingService.getOpeningsByPlanId))
    app.post('/openings/search', baseController.wrap(openingService.search))
}