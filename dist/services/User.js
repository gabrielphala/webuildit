"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
const Hasher_1 = __importDefault(require("../helpers/Hasher"));
const Jwt_1 = __importDefault(require("../helpers/Jwt"));
class UserServices {
    static async signUp(wrapRes, body) {
        try {
            Validation_1.default.validate({
                'First name': { value: body.firstname, min: 2, max: 20 },
                'Last name': { value: body.lastname, min: 2, max: 20 },
                'Email address': { value: body.email, min: 5, max: 50 },
                'Password': { value: body.password, min: 8, max: 30 },
                'Confirm password': { value: body.passwordAgain, min: 8, max: 30, is: ['Password', 'Passwords do not match'] },
            });
            if (!(/^[a-z\s]+$/.test(body.firstname)))
                throw 'First name should be alphabets or space';
            if (!(/^[a-z\s]+$/.test(body.lastname)))
                throw 'Last name should be alphabets or space';
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)))
                throw 'Email address is invalid';
            const userDetails = await User_1.default.insert({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: await Hasher_1.default.hash(body.password)
            });
            delete userDetails.password;
            const tokens = Jwt_1.default.get_cookie_tokens(userDetails.toObject());
            wrapRes.set_cookie('pf_user', tokens);
            wrapRes.userDetails = userDetails;
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async signIn(wrapRes, body) {
        try {
            Validation_1.default.validate({
                'Email address': { value: body.email, min: 3, max: 50 },
                'Password': { value: body.password, min: 8, max: 30 }
            });
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)))
                throw 'Email address is invalid';
            let userDetails = await User_1.default.getByEmail(body.email);
            if (!userDetails)
                throw 'Account does not exist';
            if (!Hasher_1.default.isSame(userDetails.password, body.password))
                throw 'Password is incorrect';
            delete userDetails.password;
            const tokens = Jwt_1.default.get_cookie_tokens(userDetails.toObject());
            wrapRes.set_cookie('pf_user', tokens);
            wrapRes.userDetails = userDetails;
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async getBySession(wrapRes, body, store) {
        wrapRes.details = store.userInfo;
        wrapRes.successful = true;
        return wrapRes;
    }
    static async updateUser(wrapRes, body, store) {
        try {
            const { firstname, lastname, email } = body;
            Validation_1.default.validate({
                'First name': { value: firstname, min: 2, max: 20 },
                'Last name': { value: lastname, min: 2, max: 20 },
                'Email address': { value: email, min: 5, max: 50 }
            });
            if (!(/^[a-z\s]+$/.test(body.firstname)))
                throw 'First name should be alphabets or space';
            if (!(/^[a-z\s]+$/.test(body.lastname)))
                throw 'Last name should be alphabets or space';
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)))
                throw 'Email address is invalid';
            const userExists = await User_1.default.exists({
                email,
                user_id: { $ne: store.userInfo.user_id }
            });
            if (userExists.found)
                throw 'Email already in use';
            User_1.default.update({ user_id: store.userInfo.user_id }, {
                firstname,
                lastname,
                email
            });
            let userDetails = await User_1.default.getByEmail(body.email);
            delete userDetails.password;
            const tokens = Jwt_1.default.get_cookie_tokens(userDetails.toObject());
            wrapRes.set_cookie('pf_user', tokens);
            wrapRes.userDetails = userDetails;
            wrapRes.successful = true;
        }
        catch (error) {
            throw error;
        }
        return wrapRes;
    }
    static async deleteAccount(wrapRes, body, store) {
        try {
            User_1.default.update({ user_id: store.userInfo.user_id }, { is_removed: true });
            wrapRes.successful = true;
        }
        catch (error) {
            throw error;
        }
        return wrapRes;
    }
}
exports.default = UserServices;
;
//# sourceMappingURL=User.js.map