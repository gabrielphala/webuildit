"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const middleware_1 = require("../../middleware");
exports.default = (app) => {
    app.get('/', base_1.default.render('Home'));
    app.get('/search', middleware_1.isUserLoggedIn, base_1.default.render('Search'));
    app.get('/plans', middleware_1.isUserLoggedIn, base_1.default.render('Plans'));
    app.get('/plan/view', middleware_1.isUserLoggedIn, base_1.default.render('Plan view'));
    app.get('/history', middleware_1.isUserLoggedIn, base_1.default.render('History'));
    app.get('/profile', middleware_1.isUserLoggedIn, base_1.default.render('Profile'));
    app.get('/sign-up', base_1.default.render('Sign up'));
    app.get('/sign-in', base_1.default.render('Sign in'));
};
//# sourceMappingURL=base.js.map