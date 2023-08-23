"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const User_1 = __importDefault(require("../../services/User"));
exports.default = (app) => {
    app.post('/sign-out', base_1.default.signOut);
    app.post('/sign-up', base_1.default.wrap(User_1.default.signUp));
    app.post('/sign-in', base_1.default.wrap(User_1.default.signIn));
    app.post('/user/get/by/session', base_1.default.wrap_with_store(User_1.default.getBySession));
    app.post('/user/update', base_1.default.wrap_with_store(User_1.default.updateUser));
    app.post('/user/delete', base_1.default.wrap_with_store(User_1.default.deleteAccount));
};
//# sourceMappingURL=user.js.map