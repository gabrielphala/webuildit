"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Foundation_1 = __importDefault(require("../../services/Foundation"));
exports.default = (app) => {
    app.post('/foundation/add', base_1.default.wrap_with_store(Foundation_1.default.add));
    app.post('/foundation/get/by/plan/unique-id/:plan_no', base_1.default.wrap_with_request(Foundation_1.default.view));
};
//# sourceMappingURL=foundation.js.map