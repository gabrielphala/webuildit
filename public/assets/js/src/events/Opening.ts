import { Events, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import { closeModal } from "../helpers/modal";
import fetch from "../helpers/fetch";

export default () => new (class Opening {
    constructor () {
        new Events(this)
    }

    async add (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/opening/add', {
            body: {
                plan_id: $('#plan-id').val(),
                kind: $('#opening-kind').val(),
                length_area: $('#area-length').val(),
                height_area: $('#area-height').val()
            }
        })

        if (response.successful) {
            closeModal('new-opening');

            return Refresh()
        }

        showError('opening', response.error)
    }

    async search (plan_id) {
        const response = await fetch('/openings/search', {
            body: {
                plan_id,
                query: $('#opening-query').val()
            }
        })

        let formated = '';

        response.openings.forEach(opening => {
            formated += `
                <ul class="table__body__row flex">
                    <li class="table__body__row__item">${opening.kind}</li>
                    <li class="table__body__row__item">${opening.length_area}</li>
                    <li class="table__body__row__item">${opening.height_area}</li>
                    <li class="table__body__row__item">${opening.bricks_saved}</li>
                    <li class="table__body__row__item">${opening.sand_saved}</li>
                    <li class="table__body__row__item">${opening.cement_saved}</li>
                    <li class="table__body__row__item flex" style="cursor: pointer; justify-content: flex-end;">
                        <span onclick="Opening_removeOpening('${opening.id}')">remove</span>
                    </li>
                </ul>
            `;
        });

        $('#openings').html(formated)
    }

    async removeOpening (id) {
        const response = await fetch('/opening/remove', {
            body: {
                id
            }
        })

        Refresh();
    }
});