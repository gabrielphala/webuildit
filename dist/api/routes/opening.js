"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Opening_1 = __importDefault(require("../../services/Opening"));
exports.default = (app) => {
    app.post('/opening/add', base_1.default.wrap_with_store(Opening_1.default.add));
    app.post('/opening/remove', base_1.default.wrap_with_store(Opening_1.default.removeOpening));
    app.post('/openings/get/by/plan-id/:planId', base_1.default.wrap_with_request(Opening_1.default.getOpeningsByPlanId));
};
//# sourceMappingURL=opening.js.map