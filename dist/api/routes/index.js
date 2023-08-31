"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const user_1 = __importDefault(require("./user"));
const plan_1 = __importDefault(require("./plan"));
const opening_1 = __importDefault(require("./opening"));
exports.default = (app) => {
    (0, base_1.default)(app);
    (0, user_1.default)(app);
    (0, plan_1.default)(app);
    (0, opening_1.default)(app);
};
//# sourceMappingURL=index.js.map