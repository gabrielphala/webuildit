import { Application } from "express"

import baseRoutes from "./base"
import userRoutes from "./user"
import planRoutes from "./plan"
import openingRoutes from "./opening"
import foundationRoutes from "./foundation"
import cartRoutes from "./cart"

export default (app: Application) : void => {
    baseRoutes(app)
    userRoutes(app)
    planRoutes(app)
    openingRoutes(app)
    foundationRoutes(app)
    cartRoutes(app)
}