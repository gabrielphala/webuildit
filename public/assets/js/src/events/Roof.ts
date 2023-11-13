import { Events, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import { closeModal } from "../helpers/modal";
import fetch from "../helpers/fetch";

export default () => new (class Roof {
    constructor () {
        new Events(this)
    }

    async add (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/roof/add', {
            body: {
                plan_id: $('#plan-id').val(),
                kind:  $('#roof-kind').val()
            }
        })

        if (response.successful) {
            closeModal('new-roof');

            return Refresh()
        }

        showError('roof', response.error)
    }
});