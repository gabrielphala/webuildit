import { Route } from "oddlyjs"

export default (): void => {
    Route({
        name: 'home',
        url: '/',
        layoutpath: 'base'
    })

    Route({
        name: 'search',
        url: '/search',
        layoutpath: 'info'
    })

    Route({
        name: 'cart',
        url: '/cart',
        layoutpath: 'info'
    })

    Route({
        name: 'plans',
        url: '/plans',
        layoutpath: 'info'
    })

    Route({
        name: 'plan.view',
        url: '/plan/view',
        layoutpath: 'info'
    })

    Route({
        name: 'history',
        url: '/history',
        layoutpath: 'info'
    })

    Route({
        name: 'profile',
        url: '/profile',
        layoutpath: 'info'
    })

    Route({
        name: 'sign.up',
        url: '/sign-up',
        layoutpath: 'auth'
    })

    Route({
        name: 'sign.in',
        url: '/sign-in',
        layoutpath: 'auth'
    })
}