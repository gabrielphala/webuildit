import Opening from "../models/Opening"

import v from "../helpers/Validation"

import { IAny, IResponse } from "../interfaces";

export default class PlanServices {
    static calculateMaterialUsage (length_area, height_area) {
        let wall_volume = length_area * height_area * 0.2;
        let brick_volume_mortar = .2 * .1 * .1;
        let brick_volume = .19 * .09 * .09;

        const bricks = wall_volume / brick_volume_mortar

        const mortar = (wall_volume - (brick_volume * bricks)) * 1.33;

        const cement = (mortar * (1 / 7)) * 150;
        const sand = (mortar * (6 / 7)) * 35;

        return { bricks, cement, sand };
    }

    static async add (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            const { kind, plan_id, length_area, height_area } = body;

            v.validate({
                'Area length': { value: length_area, max: 11 },
                'Area height': { value: height_area, max: 11 }
            });

            if (kind == 'select') throw 'Please select opening kind';

            if (isNaN(length_area) || !isNaN(length_area) && parseInt(length_area) <= 0) throw 'Area length must be a valid number';
            if (isNaN(height_area) || !isNaN(height_area) && parseInt(height_area) <= 0) throw 'Area height must be a valid number';

            const { bricks, cement, sand } = PlanServices.calculateMaterialUsage(length_area, height_area)

            Opening.insert({
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
        } catch (e) { throw e; }
    }

    static async getOpeningsByPlanId (wrapRes: IResponse, body: IAny, req: IAny): Promise<IResponse> {
        try {
            wrapRes.openings = await Opening.find({
                condition: { plan_id: req.params.planId, is_removed: false }
            });

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async search (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            const { plan_id, query } = body;

            wrapRes.openings = await Opening.search({
                condition: [
                    { plan_id, kind: query, is_removed: false },
                    { plan_id, length_area: query, is_removed: false },
                    { plan_id, height_area: query, is_removed: false },
                    { plan_id, bricks_saved: query, is_removed: false },
                    { plan_id, cement_saved: query, is_removed: false },
                    { plan_id, sand_saved: query, is_removed: false }
                ]
            })

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async removeOpening (wrapRes: IResponse, body: IAny, _: IAny): Promise<IResponse> {
        try {
            await Opening.update({ id: body.id }, {
                is_removed: true
            })

            return wrapRes;
        } catch (e) { throw e; }
    }
};