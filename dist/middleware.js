"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserInfo = exports.isUserLoggedIn = void 0;
const Jwt_1 = __importDefault(require("./helpers/Jwt"));
const isUserLoggedIn = (req, res, next) => {
    if (!req['store'] || req['store'] && !req['store'].userInfo)
        return res.redirect('/sign-in');
    next();
};
exports.isUserLoggedIn = isUserLoggedIn;
const loadUserInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['pf_user'])
        return next();
    Jwt_1.default.verify(req.cookies['pf_user'].jwtAccess, (userInfo) => {
        if (!req['store'])
            req['store'] = {};
        req['store'].userInfo = userInfo;
    });
    next();
};
exports.loadUserInfo = loadUserInfo;
//# sourceMappingURL=middleware.js.map