import { Events, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import { closeModal } from "../helpers/modal";
import fetch from "../helpers/fetch";

export default () => new (class Plan {
    constructor () {
        new Events(this)
    }

    async add (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/plan/add', {
            body: {
                name: $('#plan-name').val(),
                plan_for: $('#plan-for').val(),
                length_area: $('#area-length').val(),
                height_area: $('#area-height').val()
            }
        })

        if (response.successful) {
            closeModal('new-plan');

            return Refresh()
        }

        showError('plan', response.error)
    }

    async removePlan (id) {
        const response = await fetch('/plan/remove', {
            body: {
                id
            }
        })

        Refresh();
    }
});