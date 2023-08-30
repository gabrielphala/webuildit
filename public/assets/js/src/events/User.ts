import { Events, Next, Environment, Refresh } from "oddlyjs"

import { hideError, showError } from "../helpers/error-container";
import fetch from "../helpers/fetch";

import axios from "axios"

export default () => new (class User {
    constructor () {
        new Events(this)
    }

    async signUp (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/sign-up', {
            body: {
                firstname: $('#firstname').val(),
                lastname: $('#lastname').val(),
                email: $('#email-address').val(),
                username: $('#username').val(),
                password: $('#password').val(),
                passwordAgain: $('#password-again').val()
            }
        })

        if (response.successful) {
            Environment.put('userDetails', response.userDetails);

            return Next('/plans')
        }

        showError('auth', response.error)
    }

    async signIn (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/sign-in', {
            body: {
                email: $('#email-address').val(),
                password: $('#password').val()
            }
        })

        if (response.successful) {
            Environment.put('userDetails', response.userDetails);

            return Next('/plans')
        }

        showError('auth', response.error)
    }

    async update (e: PointerEvent) {
        e.preventDefault();

        const response = await fetch('/user/update', {
            body: {
                firstname: $('#firstname').val(),
                lastname: $('#lastname').val(),
                email: $('#email-address').val()
            }
        })

        if (response.successful) {
            Environment.put('userDetails', response.userDetails);

            hideError('profile');

            return Refresh();
        }

        showError('profile', response.error)
    }

    async deleteAccount () {
        const response = await fetch('/user/delete')

        if (response.successful) {
            Next('/sign-up')
        }
    }
});