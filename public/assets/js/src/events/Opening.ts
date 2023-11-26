import { Events, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import { closeModal } from "../helpers/modal";
import fetch from "../helpers/fetch";

let tableHeader = [
    '#', 'Kind', 'Area length', 'Area height', 'Bricks saved', 'Sand saved (kg)', 'Cement saved (bags)'
]

let allowedColumns = [
    'kind', 'length_area', 'height_area', 'bricks_saved', 'sand_saved', 'cement_saved'
]

export default () => new (class Opening {
    constructor () {
        new Events(this)
    }

    async add (e: PointerEvent) {
        e.preventDefault();

        let opening, kind = $('#opening-kind').val();

        if (kind == 'door') opening = $('#door-kind').val();
        else if (kind == 'window') opening = $('#window-kind').val();

        const response = await fetch('/opening/add', {
            body: {
                plan_id: $('#plan-id').val(),
                kind,
                quantity: $('#quantity').val(),
                opening,
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

    showKind () {
        const kind = $('#opening-kind').val();

        if (kind == 'select'){
            $('#door-selection').hide()
        }

        else if (kind == 'door') {
            $('#door-selection').show()
            $('#window-selection').hide()
        }

        else if (kind == 'window') {
            $('#door-selection').hide()
            $('#window-selection').show()
        }
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
                        <span onclick="Opening_removeOpening('${opening.material_id}')">remove</span>
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

    async downloadCSV (e: PointerEvent) {
        const openings = (e.currentTarget as HTMLElement).dataset.openings as string;

        const response = await fetch('/download/csv', {
            body: {
                data: JSON.parse(openings),
                tableHeader,
                allowedColumns,
                reportName: 'Material'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
});