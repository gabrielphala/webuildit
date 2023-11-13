"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Opening_1 = __importDefault(require("../../services/Opening"));
const Roof_1 = __importDefault(require("../../services/Roof"));
exports.default = (app) => {
    app.post('/opening/add', base_1.default.wrap_with_store(Opening_1.default.add));
    app.post('/opening/remove', base_1.default.wrap_with_store(Opening_1.default.removeOpening));
    app.post('/openings/get/by/plan-id/:planId', base_1.default.wrap_with_request(Opening_1.default.getOpeningsByPlanId));
    app.post('/openings/search', base_1.default.wrap(Opening_1.default.search));
    app.post('/roof/add', base_1.default.wrap(Roof_1.default.add));
    app.post('/roof/get/:plan_id', base_1.default.wrap_with_request(Roof_1.default.getOne));
};
//# sourceMappingURL=opening.js.map