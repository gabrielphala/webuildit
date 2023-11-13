"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Roof_1 = __importDefault(require("../models/Roof"));
const Foundation_1 = __importDefault(require("../models/Foundation"));
const roofs = {
    flat: 1,
    twice: 2
};
class RoofServices {
    static async add(wrapRes, body) {
        try {
            const { kind, plan_id } = body;
            const foundation = await Foundation_1.default.findOne({
                condition: {
                    plan_id
                }
            });
            const m = roofs[kind];
            const tiles = ((foundation.floor_area * 6) / 4) * m;
            if ((await Roof_1.default.exists({ plan_id })).found)
                throw 'Roof already added';
            await Roof_1.default.insert({
                plan_id,
                kind,
                tiles
            });
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
    static async getOne(wrapRes, body, { params }) {
        try {
            const roof = await Roof_1.default.findOne({
                condition: {
                    plan_id: params.plan_id
                }
            });
            wrapRes.roof = roof ? roof.toObject() : null;
            wrapRes.successful = true;
            return wrapRes;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = RoofServices;
;
//# sourceMappingURL=Roof.js.map