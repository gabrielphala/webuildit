"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Opening_1 = __importDefault(require("../models/Opening"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
class PlanServices {
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
    static async add(wrapRes, body) {
        try {
            const { kind, plan_id, length_area, height_area } = body;
            Validation_1.default.validate({
                'Area length': { value: length_area, max: 11 },
                'Area height': { value: height_area, max: 11 }
            });
            if (kind == 'select')
                throw 'Please select opening kind';
            if (isNaN(length_area) || !isNaN(length_area) && parseInt(length_area) <= 0)
                throw 'Area length must be a valid number';
            if (isNaN(height_area) || !isNaN(height_area) && parseInt(height_area) <= 0)
                throw 'Area height must be a valid number';
            const { bricks, cement, sand } = PlanServices.calculateMaterialUsage(length_area, height_area);
            Opening_1.default.insert({
                kind,
                plan_id,
                length_area,
                height_area,
                bricks_saved: bricks,
                cement_saved: cement,
                sand_saved: sand
            });
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async getOpeningsByPlanId(wrapRes, body, req) {
        try {
            wrapRes.openings = await Opening_1.default.find({
                condition: { plan_id: req.params.planId, is_removed: false }
            });
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async removeOpening(wrapRes, body, _) {
        try {
            await Opening_1.default.update({ id: body.id }, {
                is_removed: true
            });
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = PlanServices;
;
//# sourceMappingURL=Opening.js.map