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

    async removeOpening (id) {
        const response = await fetch('/opening/remove', {
            body: {
                id
            }
        })

        Refresh();
    }
});