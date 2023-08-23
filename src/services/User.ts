import User from "../models/User"

import v from "../helpers/Validation"
import hasher from "../helpers/Hasher"
import jwt from "../helpers/Jwt"

import { IAny, IResponse } from "../interfaces";

export default class UserServices {
    static async signUp (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            v.validate({
                'First name': { value: body.firstname, min: 2, max: 12 },
                'Last name': { value: body.lastname, min: 2, max: 12 },
                'Email address': { value: body.email, min: 5, max: 30 },
                'Password': { value: body.password, min: 8, max: 30 },
                'Confirm password': { value: body.passwordAgain, min: 8, max: 30, is: ['Password', 'Passwords do not match'] },
            });

            if (await User.getByEmail(body.email)) throw `Email address: ${body.email} already exists`;

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
                'Email address': { value: body.email, min: 3, max: 30 },
                'Password': { value: body.password, min: 8, max: 30 }
            });

            let userDetails = await User.getByEmail(body.email);

            if (!userDetails) throw 'Email address or Username or Password is incorrect';

            if (!hasher.isSame(userDetails.password, body.password))
                throw 'Email address or Username or Password is incorrect';

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
                'First name': { value: firstname, min: 2, max: 12 },
                'Last name': { value: lastname, min: 2, max: 12 },
                'Email address': { value: email, min: 5, max: 30 }
            });

            const userExists = await User.exists({
                email,
                id: { $ne: store.userInfo.id }
            })

            if (userExists.found) throw 'Email already in use';

            User.update({ id: store.userInfo.id }, {
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
            User.update({ id: store.userInfo.id }, { is_removed: true })

            wrapRes.successful = true;
        } catch (error) { throw error; }
        
        return wrapRes;
    }
};