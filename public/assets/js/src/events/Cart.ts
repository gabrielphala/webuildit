import { Events, Refresh } from "oddlyjs"

import fetch from "../helpers/fetch";

export default () => new (class Cart {
    constructor () {
        new Events(this)
    }

	async add (item, image,price) {
		const response = await fetch('/cart/add', {
			body: {
				item,
				image,
				price
			}
		});

		Refresh()
	}

	async increase (id) {
		const response = await fetch('/cart/increase', {
			body: {
				id
			}
		});

		Refresh()
	}

	async decrease (id) {
		const response = await fetch('/cart/decrease', {
			body: {
				id
			}
		});

		Refresh()
	}

	async clear () {
		const response = await fetch('/cart/clear');

		Refresh()
	}
});