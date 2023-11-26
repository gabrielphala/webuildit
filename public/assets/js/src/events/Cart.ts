import { Events, Refresh } from "oddlyjs"

import fetch from "../helpers/fetch";

let tableHeader = [
    '#', 'Item name', 'Price', 'Quantity', 'Image'
]

let allowedColumns = [
    'item', 'price', 'quantity', 'image'
]

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

	async downloadCSV (e: PointerEvent) {
        const products = (e.currentTarget as HTMLElement).dataset.products as string;

        const response = await fetch('/download/csv', {
            body: {
                data: JSON.parse(products),
                tableHeader,
                allowedColumns,
				reportName: 'Cart'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
});