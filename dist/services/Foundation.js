"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Foundation_1 = __importDefault(require("../models/Foundation"));
const Plan_1 = __importDefault(require("../models/Plan"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
class FoundationServices {
    static calculateMaterialUsage(length_area, height_area) {
        let wall_volume = length_area * height_area * 0.2;
        let brick_volume_mortar = .2 * .1 * .1;
        let brick_volume = .19 * .09 * .09;
        const bricks = wall_volume / brick_volume_mortar;
        const mortar = (wall_volume - (brick_volume * bricks)) * 1.33;
        const cement = (mortar * (1 / 7)) * 150;
        const sand = (mortar * (6 / 7)) * 35;
        return { bricks, cement, sand };
    }
    static async add(wrapRes, body, { userInfo }) {
        try {
            const { plan_id, floor_area, wall_perimeter, wall_height } = body;
            Validation_1.default.validate({
                'Perimeter': { value: wall_perimeter, max: 11 },
                'Height': { value: wall_height, max: 11 }
            });
            if (!(parseFloat(floor_area) > 0))
                throw 'Floor area should be a valid number';
            if (!(parseFloat(wall_perimeter) > 0))
                throw 'Perimeter should be a valid number';
            if (!(parseFloat(wall_height) > 0))
                throw 'Height should be a valid number';
            const { bricks, cement, sand } = FoundationServices.calculateMaterialUsage(wall_perimeter, wall_height);
            const foundation_vol = floor_area * .09;
            const found_cement = (foundation_vol * (1 / 7)) * 150;
            const found_sand = (foundation_vol * (6 / 7)) * 35;
            if ((await Foundation_1.default.exists({ plan_id })).found)
                throw 'Foundation already added';
            await Foundation_1.default.insert({
                plan_id,
                height: wall_height,
                perimeter: wall_perimeter,
                concrete: cement + found_cement,
                floor_area
            });
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async view(wrapRes, body, req) {
        try {
            const { plan_no } = req.params;
            const planDetails = await Plan_1.default.findOne({
                condition: {
                    plan_no
                }
            });
            const foundation = (await Foundation_1.default.findOne({
                condition: {
                    plan_id: planDetails.plan_id
                }
            }));
            wrapRes.details = foundation ? foundation.toObject() : null;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = FoundationServices;
;
//# sourceMappingURL=Foundation.js.map