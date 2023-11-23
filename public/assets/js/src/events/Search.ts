import { Events, Refresh } from "oddlyjs"

import { fetchText } from "../helpers/fetch";

import Cart from "./Cart";

export default () => new (class Search {
    constructor () {
        new Events(this)

		window['addToCart'] = (item, image, price) => {
			Cart().add(item, image, price)
		}
    }

	async search () {
		const response = await fetchText('http://localhost:5000/search', {
			body: {
				text: $('#query-text').val()
			}
		});

		try {
			const products = JSON.parse(response.trim());

			let f = '';

			products.forEach(element => {
				f += `
					<div>
						<div class="image--back" style="border-radius: 6px; height: 20rem; background-image: url('${element.image}');"></div>
						<h4>${element.title}</h4>
						<p>R${element.price}</p>
						<button onclick="addToCart('${element.title}', '${element.image}', '${element.price}')">Add to cart</button>
        			</div>
				`
			});

			$('#products').html(f)
		} catch (error) { console.log(error);
		 }
	}
});