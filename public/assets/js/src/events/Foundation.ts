import { Events, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import { closeModal } from "../helpers/modal";
import fetch from "../helpers/fetch";

export default () => new (class Foundation {
    constructor () {
        new Events(this)
    }

    async add (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/foundation/add', {
            body: {
                plan_id: $('#w-plan-id').val(),
                floor_area: $('#floor-area').val(),
                wall_perimeter: $('#perimeter').val(),
                wall_height: $('#height').val()
            }
        })

        if (response.successful) {
            closeModal('new-foundation');

            return Refresh()
        }

        showError('opening', response.error)
    }
});