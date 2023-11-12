import { Events, Refresh } from "oddlyjs"

import { fetchText } from "../helpers/fetch";

export default () => new (class Search {
    constructor () {
        new Events(this)
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
        	</div>
				`
			});

			console.log(products);
			

			$('#products').html(f)
		} catch (error) { console.log(error);
		 }
	}
});