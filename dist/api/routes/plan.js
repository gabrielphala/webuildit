"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Plan_1 = __importDefault(require("../../services/Plan"));
exports.default = (app) => {
    app.post('/plan/add', base_1.default.wrap_with_store(Plan_1.default.add));
    app.post('/plan/edit', base_1.default.wrap_with_store(Plan_1.default.edit));
    app.post('/plan/remove', base_1.default.wrap_with_store(Plan_1.default.removePlan));
    app.post('/plan/get/by/unique-id/:planNo', base_1.default.wrap_with_request(Plan_1.default.getPlanByUniqueId));
    app.post('/plan/get/by/id', base_1.default.wrap(Plan_1.default.getPlanById));
    app.post('/plans/get/by/user', base_1.default.wrap_with_store(Plan_1.default.getUserPlans));
    app.post('/plans/search', base_1.default.wrap_with_store(Plan_1.default.searchUserPlans));
};
//# sourceMappingURL=plan.js.map