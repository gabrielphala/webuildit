import { Application } from "express"

import baseRoutes from "./base"
import userRoutes from "./user"
import planRoutes from "./plan"
import openingRoutes from "./opening"

export default (app: Application) : void => {
    baseRoutes(app)
    userRoutes(app)
    planRoutes(app)
    openingRoutes(app)
}