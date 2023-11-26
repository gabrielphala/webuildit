import Plan from "../models/Plan"
import Opening from "../models/Opening"

import v from "../helpers/Validation"
import { makeId } from "../helpers/String";

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

    static async add (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
        try {
            const { name, plan_for, length_area, height_area } = body;

            v.validate({
                'Plan name': { value: name, min: 2, max: 50 },
                'Plan for': { value: plan_for, min: 2, max: 50 },
                'Area length': { value: length_area, max: 11 },
                'Area height': { value: height_area, max: 11 }
            });

            if (!(/^[0-9a-zA-Z\s-_]+$/.test(name))) throw 'Name should have letters, numbers, -, space, or underscore';
            if (!(/^[0-9a-zA-Z\s-_]+$/.test(plan_for))) throw 'Name should have letters, numbers, -, space, or underscore';

            if (!(parseFloat(length_area) > 0)) throw 'Length should be a valid number';
            if (!(parseFloat(height_area) > 0)) throw 'Height should be a valid number';

            const { bricks, cement, sand } = PlanServices.calculateMaterialUsage(length_area, height_area)

            Plan.insert({
                plan_no: makeId(5),
                name,
                user_id: userInfo.user_id,
                plan_for,
                length_area,
                height_area,
                brick_count: bricks,
                cement: Math.round(cement / 50) * 3,
                sand
            });

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async edit (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
        try {
            const { plan_id, name, plan_for, length_area, height_area } = body;

            v.validate({
                'Plan name': { value: name, min: 2, max: 50 },
                'Plan for': { value: plan_for, min: 2, max: 50 },
                'Area length': { value: length_area, max: 11 },
                'Area height': { value: height_area, max: 11 }
            });

            if (!(/^[0-9a-zA-Z\s-_]+$/.test(name))) throw 'Name should have letters, numbers, -, space, or underscore';
            if (!(/^[0-9a-zA-Z\s-_]+$/.test(plan_for))) throw 'Name should have letters, numbers, -, space, or underscore';

            if (!(parseFloat(length_area) > 0)) throw 'Length should be a valid number';
            if (!(parseFloat(height_area) > 0)) throw 'Height should be a valid number';

            const { bricks, cement, sand } = PlanServices.calculateMaterialUsage(length_area, height_area)

            Plan.update(
                { plan_id: plan_id },
                {
                    name,
                    plan_for,
                    length_area,
                    height_area,
                    brick_count: bricks,
                    cement: Math.round(cement / 50) * 3,
                    sand
                }
            )
            
            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async getUserPlans (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
        try {
            wrapRes.plans = await Plan.find({
                condition: { user_id: userInfo.user_id, is_removed: false }
            });

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async searchUserPlans (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
        try {

            const { query } = body;

            if (!(/^[0-9a-zA-Z\s-_]+$/.test(query))) throw 'Search term should have letters, numbers, -, space, or underscore';

            wrapRes.plans = await Plan.search({
                condition: [
                    { user_id: userInfo.user_id, name: query, is_removed: false },
                    { user_id: userInfo.user_id, plan_for: query, is_removed: false },
                    { user_id: userInfo.user_id, plan_no: query, is_removed: false },
                    { user_id: userInfo.user_id, length_area: query, is_removed: false },
                    { user_id: userInfo.user_id, height_area: query, is_removed: false },
                    { user_id: userInfo.user_id, brick_count: query, is_removed: false },
                    { user_id: userInfo.user_id, cement: query, is_removed: false },
                    { user_id: userInfo.user_id, sand: query, is_removed: false },
                    { user_id: userInfo.user_id, window_count: query, is_removed: false },
                ]
            });

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async getPlanByUniqueId (wrapRes: IResponse, body: IAny, req: IAny): Promise<IResponse> {
        try {
            wrapRes.details = (await Plan.findOne({
                condition: { plan_no: req.params.planNo, is_removed: false }
            })).toObject();

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async getPlanById (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            wrapRes.details = (await Plan.findOne({
                condition: { plan_id: body.plan_id, is_removed: false }
            })).toObject();

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

    static async removePlan (wrapRes: IResponse, body: IAny, _: IAny): Promise<IResponse> {
        try {
            await Plan.update({ plan_id: body.id }, {
                is_removed: true
            })

            await Opening.update({ plan_id: body.id }, {
                is_removed: true
            })

            return wrapRes;
        } catch (e) { throw e; }
    }
};
