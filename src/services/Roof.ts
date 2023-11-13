import Roof from "../models/Roof"
import Foundation from "../models/Foundation";

import { IAny, IResponse } from "../interfaces";

const roofs = {
	flat: 1,
	twice: 2
}

export default class RoofServices {
    static async add (wrapRes: IResponse, body: IAny): Promise<IResponse> {
        try {
            const { kind, plan_id } = body;

			const foundation = await Foundation.findOne({
				condition: {
					plan_id
				}
			})

			const m = roofs[kind];

			const tiles = ((foundation.floor_area * 6) / 4) * m;

			if ((await Roof.exists({ plan_id })).found)
				throw 'Roof already added';
            
            await Roof.insert({
				plan_id,
                kind,
                tiles
            });

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

	static async getOne (wrapRes: IResponse, body: IAny, { params }:IAny): Promise<IResponse> {
        try {
            const roof = await Roof.findOne({
				condition: {
					plan_id: params.plan_id
				}
            });

			wrapRes.roof = roof ? roof.toObject() : null

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }
};