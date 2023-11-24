import Cart from "../models/Cart"

import v from "../helpers/Validation"

import { IAny, IResponse } from "../interfaces";

export default class CartServices {
    static async add (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
        try {
            const { image, item, price } = body;

			Cart.insert({
				item,
				price,
				image,
				user_id: userInfo.user_id
			})

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
    }

	static async getAllProducts (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse> {
		try {
			wrapRes.products = await Cart.find({
				condition: {
					user_id: userInfo.user_id,
					is_removed: false
				}
			});

            wrapRes.successful = true;

            return wrapRes;
        } catch (e) { throw e; }
	}

	static async increase (wrapRes: IResponse, body: IAny) : Promise<IResponse>  {
		try {
			const { id } = body;

			const product = await Cart.findOne({
				condition: {
					cart_item_id: id
				}
			})

			product.quantity++;

			product.save()

            return wrapRes;
        } catch (e) { throw e; }
	}

	static async decrease (wrapRes: IResponse, body: IAny) : Promise<IResponse>  {
		const { id } = body;

			const product = await Cart.findOne({
				condition: {
					cart_item_id: id
				}
			})

			if (product.quantity <= 0)
 				return wrapRes;
			
			product.quantity--;

			product.save()

            return wrapRes;
	}

	static async clear (wrapRes: IResponse, body: IAny, { userInfo }: IAny) : Promise<IResponse>  {
		const product = await Cart.update(
			{
				user_id: userInfo.user_id
			},
			{
				is_removed: true
			}
		)

		return wrapRes;
	}
};
