import { Events, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import { closeModal, openModal } from "../helpers/modal";
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

    async edit (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/plan/edit', {
            body: {
                plan_id: $('#edit-plan-id').val(),
                name: $('#edit-plan-name').val(),
                plan_for: $('#edit-plan-for').val(),
                length_area: $('#edit-area-length').val(),
                height_area: $('#edit-area-height').val()
            }
        })

        if (response.successful) {
            closeModal('edit-plan');

            return Refresh()
        }

        showError('plan', response.error)
    }

    async prepareEdit (plan_id) {
        $('#edit-plan-id').val(plan_id);

        const res = await fetch('/plan/get/by/id', {
            body: {
                plan_id
            }
        })

        if (res.successful) {
            $('#edit-plan-name').val(res.details.name)
            $('#edit-plan-for').val(res.details.plan_for)
            $('#edit-area-length').val(res.details.length_area)
            $('#edit-area-height').val(res.details.height_area)
        }

        openModal('edit-plan');
    }

    async removePlan (id) {
        const response = await fetch('/plan/remove', {
            body: {
                id
            }
        })

        Refresh();
    }

    async searchUserPlans () {
        const response = await fetch('/plans/search', {
            body: {
                query: $('#search-query').val()
            }
        })

        let formated = '';

        response.plans.forEach(plan => {
            formated += `
                <ul class="table__body__row flex">
                    <li class="table__body__row__item">${plan.plan_no}</li>
                    <li class="table__body__row__item">${plan.name}</li>
                    <li class="table__body__row__item">${plan.plan_for}</li>
                    <li class="table__body__row__item">${plan.length_area}</li>
                    <li class="table__body__row__item">${plan.height_area}</li>
                    <li class="table__body__row__item">${plan.brick_count}</li>
                    <li class="table__body__row__item">${plan.sand}</li>
                    <li class="table__body__row__item">${plan.cement}</li>
                    <li class="table__body__row__item flex" style="cursor: pointer; justify-content: flex-end;">
                        <a href="/plan/view?pn=${plan.plan_no}" class="margin--right-1" onclick="Util_nav(event)">view</a>
                        <span onclick="Plan_removePlan('${plan.id}')">remove</span>
                    </li>
                </ul>
            `;
        });

        $('#plans').html(formated)
    }
});