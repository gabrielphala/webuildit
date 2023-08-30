"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Plan_1 = __importDefault(require("../../services/Plan"));
exports.default = (app) => {
    app.post('/plan/add', base_1.default.wrap_with_store(Plan_1.default.add));
    app.post('/plan/remove', base_1.default.wrap_with_store(Plan_1.default.removePlan));
    app.post('/plans/get/by/user', base_1.default.wrap_with_store(Plan_1.default.getUserPlans));
};
//# sourceMappingURL=plan.js.map