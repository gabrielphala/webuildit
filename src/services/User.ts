import User from "../models/User"

import v from "../helpers/Validation"
import hasher from "../helpers/Hasher"
import jwt from "../helpers/Jwt"

import { IAny, IResponse } from "../interfaces";
import Plan from "../models/Plan";
import Opening from "../models/Opening";

export default class UserServices {
    static async signUp (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            v.validate({
                'First name': { value: body.firstname, min: 2, max: 20 },
                'Last name': { value: body.lastname, min: 2, max: 20 },
                'Email address': { value: body.email, min: 5, max: 50 },
                'Password': { value: body.password, min: 8, max: 30 },
                'Confirm password': { value: body.passwordAgain, min: 8, max: 30, is: ['Password', 'Passwords do not match'] },
            });


            if (!(/^[a-zA-Z\s]+$/.test(body.firstname))) throw 'First name should be alphabets or space'
            if (!(/^[a-zA-Z\s]+$/.test(body.lastname))) throw 'Last name should be alphabets or space'
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email))) throw 'Email address is invalid'

            const userDetails = await User.insert({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: await hasher.hash(body.password)
            })

            delete userDetails.password;

            const tokens = jwt.get_cookie_tokens(userDetails.toObject());
            wrapRes.set_cookie('pf_user', tokens);

            wrapRes.userDetails = userDetails;
            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async signIn (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            v.validate({
                'Email address': { value: body.email, min: 3, max: 50 },
                'Password': { value: body.password, min: 8, max: 30 }
            });

            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email))) throw 'Email address is invalid'

            let userDetails = await User.getByEmail(body.email);

            if (!userDetails) throw 'Account does not exist';

            if (!hasher.isSame(userDetails.password, body.password))
                throw 'Password is incorrect';

            delete userDetails.password;

            const tokens = jwt.get_cookie_tokens(userDetails.toObject());
            wrapRes.set_cookie('pf_user', tokens);

            wrapRes.userDetails = userDetails;
            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async getBySession (wrapRes: IResponse, body: IAny, store: IAny): Promise<IResponse> {
        wrapRes.details = store.userInfo;
        wrapRes.successful = true;
        
        return wrapRes;
    }

    static async updateUser (wrapRes: IResponse, body: IAny, store: IAny): Promise<IResponse> {
        try {
            const { firstname, lastname, email } = body;

            v.validate({
                'First name': { value: firstname, min: 2, max: 20 },
                'Last name': { value: lastname, min: 2, max: 20 },
                'Email address': { value: email, min: 5, max: 50 }
            });

            if (!(/^[a-zA-Z\s]+$/.test(body.firstname))) throw 'First name should be alphabets or space'
            if (!(/^[a-zA-Z\s]+$/.test(body.lastname))) throw 'Last name should be alphabets or space'
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email))) throw 'Email address is invalid'

            const userExists = await User.exists({
                email,
                user_id: { $ne: store.userInfo.user_id }
            })

            if (userExists.found) throw 'Email already in use';

            User.update({ user_id: store.userInfo.user_id }, {
                firstname,
                lastname,
                email
            })

            let userDetails = await User.getByEmail(body.email);

            delete userDetails.password;

            const tokens = jwt.get_cookie_tokens(userDetails.toObject());
            wrapRes.set_cookie('pf_user', tokens);

            wrapRes.userDetails = userDetails;
            wrapRes.successful = true;
        } catch (error) { throw error; }
        
        return wrapRes;
    }

    static async deleteAccount (wrapRes: IResponse, body: IAny, store: IAny): Promise<IResponse> {
        try {
            User.update({ user_id: store.userInfo.user_id }, { is_removed: true })

            const plans = await Plan.find({
                condition: {
                    user_id: store.userInfo.user_id
                }
            })

            plans.forEach(async (plan) => {
                await Opening.update({ plan_id: plan.plan_id }, {
                    is_removed: true
                })
            })

            wrapRes.successful = true;
        } catch (error) { throw error; }
        
        return wrapRes;
    }
};