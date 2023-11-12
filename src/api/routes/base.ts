import { Application } from "express";

import baseController from "../controllers/base";
import { isUserLoggedIn } from "../../middleware";
import DownloadService from "../../services/Download";

export default (app: Application) => {
    app.get('/', baseController.render('Home'))
    app.get('/search', isUserLoggedIn, baseController.render('Search'))
    app.get('/plans', isUserLoggedIn, baseController.render('Plans'))
    app.get('/plan/view', isUserLoggedIn, baseController.render('Plan view'))
    app.get('/history', isUserLoggedIn, baseController.render('History'))
    app.get('/profile', isUserLoggedIn, baseController.render('Profile'))
    app.get('/sign-up', baseController.render('Sign up'))
    app.get('/sign-in', baseController.render('Sign in'))

    app.post('/download/csv', baseController.wrap(DownloadService.download))
}