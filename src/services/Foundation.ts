import Foundation from "../models/Foundation";
import Plan from "../models/Plan";

import v from "../helpers/Validation"

import { IAny, IResponse } from "../interfaces";

export default class FoundationServices {
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

	static async add (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
        try {
            const { plan_id, floor_area, wall_length, wall_height } = body;

            v.validate({
                'Wall length': { value: wall_length, max: 11 },
                'Wall height': { value: wall_height, max: 11 }
            });

            if (!(parseFloat(floor_area) > 0)) throw 'Length should be a valid number';
            if (!(parseFloat(wall_length) > 0)) throw 'Length should be a valid number';
            if (!(parseFloat(wall_height) > 0)) throw 'Height should be a valid number';

            const { bricks, cement, sand } = FoundationServices.calculateMaterialUsage(wall_length, wall_height)

			const foundation_vol = floor_area * .09;

			const found_cement = (foundation_vol * (1 / 7)) * 150;
        	const found_sand = (foundation_vol * (6 / 7)) * 35;

            if ((await Foundation.exists({ plan_id })).found)
				throw 'Foundation already added';
			
            await Foundation.insert({
				plan_id,
                wall_height,
                wall_length,
				floor_area,
                brick_count: bricks,
                cement: Math.round(cement + found_cement / 50),
                sand: sand + found_sand
            });

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

	static async view (wrapRes: IResponse, body: IAny, req: IAny): Promise<IResponse> {
        try {
            const { plan_no } = req.params;

			const planDetails = await Plan.findOne({
				condition: {
					plan_no
				}
			})

			const foundation = (await Foundation.findOne({
				condition: {
					plan_id: planDetails.plan_id
				}
			}))

			wrapRes.details = foundation ? foundation.toObject() : null;

            return wrapRes;
        } catch (e) { throw e; }
    }
};