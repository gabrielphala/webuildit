import { NextFunction, Request, Response } from "express";

import Jwt from "./helpers/Jwt";

export const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req['store'] || req['store'] && !req['store'].userInfo)
        return res.redirect('/sign-in')

    next();
}

export const loadUserInfo = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies || req.cookies && !req.cookies['pf_user'])
        return next();

    Jwt.verify(req.cookies['pf_user'].jwtAccess, (userInfo: object) => {
        if (!req['store']) req['store'] = {}
        req['store'].userInfo = userInfo;
    });

    next();
}