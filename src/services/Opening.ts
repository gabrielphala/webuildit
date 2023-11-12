import Opening from "../models/Opening"

import v from "../helpers/Validation"

import { IAny, IResponse } from "../interfaces";

const openings = {
    door: {
        'single leaf': [0.9, 2.1],
        '2 pane sliding door': [1.3, 2.1],
        '4 pane sliding door': [2.4, 2.1],
        'double leaf': [1.8, 2.1],
        'single garage door': [2.44, 2.13],
        'double garage door': [4.88, 2.13],
    }
}

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
            const { kind, plan_id, opening, quantity } = body;

            const [length_area, height_area] = openings[kind][opening];

            if (kind == 'select') throw 'Please select opening kind';

            if (opening == 'select') throw 'Please select opening';

            if (!(parseFloat(quantity) > 0)) throw 'Quantity should be a valid number';

            const { bricks, cement, sand } = PlanServices.calculateMaterialUsage(length_area, height_area)

            await Opening.insert({
                kind,
                name: opening,
                plan_id,
                quantity,
                length_area: length_area * quantity,
                height_area: height_area * quantity,
                bricks_saved: bricks * quantity,
                cement_saved: Math.ceil((cement * quantity)),
                sand_saved: sand * quantity
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

            if (/^[0-9a-z\s-_]+$/.test(query)) throw 'Search term should have letters, numbers, -, space, or underscore';

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
            await Opening.update({ material_id: body.id }, {
                is_removed: true
            })

            return wrapRes;
        } catch (e) { throw e; }
    }
};