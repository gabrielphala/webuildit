/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/assets/js/src/app.ts":
/*!*************************************!*\
  !*** ./public/assets/js/src/app.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./public/assets/js/src/routes/index.ts"));
const events_1 = __importDefault(__webpack_require__(/*! ./events */ "./public/assets/js/src/events/index.ts"));
const middleware_1 = __importDefault(__webpack_require__(/*! ./middleware */ "./public/assets/js/src/middleware/index.ts"));
(0, routes_1.default)();
(0, events_1.default)();
(0, middleware_1.default)();
(0, oddlyjs_1.Load)();
// setTimeout(() => {
//     const sig = loadSignal('count');
//     console.log(sig)
//     sig.value = 'tau';
// }, 2000)


/***/ }),

/***/ "./public/assets/js/src/events/Foundation.ts":
/*!***************************************************!*\
  !*** ./public/assets/js/src/events/Foundation.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const error_container_1 = __webpack_require__(/*! ../helpers/error-container */ "./public/assets/js/src/helpers/error-container.ts");
const modal_1 = __webpack_require__(/*! ../helpers/modal */ "./public/assets/js/src/helpers/modal.ts");
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
exports["default"] = () => new (class Foundation {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    async add(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/foundation/add', {
            body: {
                plan_id: $('#w-plan-id').val(),
                floor_area: $('#floor-area').val(),
                wall_length: $('#length').val(),
                wall_height: $('#height').val()
            }
        });
        if (response.successful) {
            (0, modal_1.closeModal)('new-foundation');
            return (0, oddlyjs_1.Refresh)();
        }
        (0, error_container_1.showError)('opening', response.error);
    }
});


/***/ }),

/***/ "./public/assets/js/src/events/Opening.ts":
/*!************************************************!*\
  !*** ./public/assets/js/src/events/Opening.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const error_container_1 = __webpack_require__(/*! ../helpers/error-container */ "./public/assets/js/src/helpers/error-container.ts");
const modal_1 = __webpack_require__(/*! ../helpers/modal */ "./public/assets/js/src/helpers/modal.ts");
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
exports["default"] = () => new (class Opening {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    async add(e) {
        e.preventDefault();
        let opening, kind = $('#opening-kind').val();
        if (kind == 'door')
            opening = $('#door-kind').val();
        else if (kind == 'window')
            opening = $('#window-kind').val();
        const response = await (0, fetch_1.default)('/opening/add', {
            body: {
                plan_id: $('#plan-id').val(),
                kind,
                quantity: $('#quantity').val(),
                opening,
                length_area: $('#area-length').val(),
                height_area: $('#area-height').val()
            }
        });
        if (response.successful) {
            (0, modal_1.closeModal)('new-opening');
            return (0, oddlyjs_1.Refresh)();
        }
        (0, error_container_1.showError)('opening', response.error);
    }
    showKind() {
        const kind = $('#opening-kind').val();
        if (kind == 'select') {
            $('#door-selection').hide();
        }
        else if (kind == 'door') {
            $('#door-selection').show();
            $('#window-selection').hide();
        }
        else if (kind == 'window') {
            $('#door-selection').hide();
            $('#window-selection').show();
        }
    }
    async search(plan_id) {
        const response = await (0, fetch_1.default)('/openings/search', {
            body: {
                plan_id,
                query: $('#opening-query').val()
            }
        });
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
        $('#openings').html(formated);
    }
    async removeOpening(id) {
        const response = await (0, fetch_1.default)('/opening/remove', {
            body: {
                id
            }
        });
        (0, oddlyjs_1.Refresh)();
    }
});


/***/ }),

/***/ "./public/assets/js/src/events/Plan.ts":
/*!*********************************************!*\
  !*** ./public/assets/js/src/events/Plan.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const error_container_1 = __webpack_require__(/*! ../helpers/error-container */ "./public/assets/js/src/helpers/error-container.ts");
const modal_1 = __webpack_require__(/*! ../helpers/modal */ "./public/assets/js/src/helpers/modal.ts");
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
let tableHeader = [
    '#', 'Unique no', 'Plan name', 'For', 'Area length', 'Area height', 'Bricks', 'Sand (kg)', 'Cement (bags)'
];
let allowedColumns = [
    'plan_no', 'name', 'plan_for', 'length_area', 'height_area', 'brick_count', 'sand', 'cement'
];
exports["default"] = () => new (class Plan {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    async add(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/plan/add', {
            body: {
                name: $('#plan-name').val(),
                plan_for: $('#plan-for').val(),
                length_area: $('#area-length').val(),
                height_area: $('#area-height').val()
            }
        });
        if (response.successful) {
            (0, modal_1.closeModal)('new-plan');
            return (0, oddlyjs_1.Refresh)();
        }
        (0, error_container_1.showError)('plan', response.error);
    }
    async edit(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/plan/edit', {
            body: {
                plan_id: $('#edit-plan-id').val(),
                name: $('#edit-plan-name').val(),
                plan_for: $('#edit-plan-for').val(),
                length_area: $('#edit-area-length').val(),
                height_area: $('#edit-area-height').val()
            }
        });
        if (response.successful) {
            (0, modal_1.closeModal)('edit-plan');
            return (0, oddlyjs_1.Refresh)();
        }
        (0, error_container_1.showError)('plan', response.error);
    }
    async prepareEdit(plan_id) {
        $('#edit-plan-id').val(plan_id);
        const res = await (0, fetch_1.default)('/plan/get/by/id', {
            body: {
                plan_id
            }
        });
        if (res.successful) {
            $('#edit-plan-name').val(res.details.name);
            $('#edit-plan-for').val(res.details.plan_for);
            $('#edit-area-length').val(res.details.length_area);
            $('#edit-area-height').val(res.details.height_area);
        }
        (0, modal_1.openModal)('edit-plan');
    }
    async removePlan(id) {
        const response = await (0, fetch_1.default)('/plan/remove', {
            body: {
                id
            }
        });
        (0, oddlyjs_1.Refresh)();
    }
    async searchUserPlans() {
        const response = await (0, fetch_1.default)('/plans/search', {
            body: {
                query: $('#search-query').val()
            }
        });
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
                        <span style="margin-right: .5rem;" onclick="Plan_prepareEdit('${plan.plan_id}')">edit</span>
                        <span onclick="Plan_removePlan('${plan.plan_id}')">remove</span>
                    </li>
                </ul>
            `;
        });
        $('#plans').html(formated);
    }
    async downloadCSV(e) {
        const plans = e.currentTarget.dataset.plans;
        const response = await (0, fetch_1.default)('/download/csv', {
            body: {
                data: JSON.parse(plans),
                tableHeader,
                allowedColumns
            }
        });
        if (response.successful) {
            const anchor = $('#download-anchor');
            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`);
            anchor[0].click();
        }
    }
});


/***/ }),

/***/ "./public/assets/js/src/events/Roof.ts":
/*!*********************************************!*\
  !*** ./public/assets/js/src/events/Roof.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const error_container_1 = __webpack_require__(/*! ../helpers/error-container */ "./public/assets/js/src/helpers/error-container.ts");
const modal_1 = __webpack_require__(/*! ../helpers/modal */ "./public/assets/js/src/helpers/modal.ts");
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
exports["default"] = () => new (class Roof {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    async add(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/roof/add', {
            body: {
                plan_id: $('#plan-id').val(),
                kind: $('#roof-kind').val()
            }
        });
        if (response.successful) {
            (0, modal_1.closeModal)('new-roof');
            return (0, oddlyjs_1.Refresh)();
        }
        (0, error_container_1.showError)('roof', response.error);
    }
});


/***/ }),

/***/ "./public/assets/js/src/events/Search.ts":
/*!***********************************************!*\
  !*** ./public/assets/js/src/events/Search.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const fetch_1 = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts");
exports["default"] = () => new (class Search {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    async search() {
        const response = await (0, fetch_1.fetchText)('http://localhost:5000/search', {
            body: {
                text: $('#query-text').val()
            }
        });
        try {
            const products = JSON.parse(response.trim());
            let f = '';
            products.forEach(element => {
                f += `
					<div>
            <div class="image--back" style="border-radius: 6px; height: 20rem; background-image: url('${element.image}');"></div>
            <h4>${element.title}</h4>
            <p>R${element.price}</p>
        	</div>
				`;
            });
            console.log(products);
            $('#products').html(f);
        }
        catch (error) {
            console.log(error);
        }
    }
});


/***/ }),

/***/ "./public/assets/js/src/events/Util.ts":
/*!*********************************************!*\
  !*** ./public/assets/js/src/events/Util.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const modal_1 = __webpack_require__(/*! ../helpers/modal */ "./public/assets/js/src/helpers/modal.ts");
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
exports["default"] = () => new (class Util {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    openModal(id) {
        (0, modal_1.openModal)(id);
    }
    closeModal(id) {
        (0, modal_1.closeModal)(id);
    }
    link(path) {
        (0, oddlyjs_1.Next)(path);
        const overlay = $('.overlay')[0];
        if (overlay)
            overlay.click();
    }
    signOut() {
        (async () => {
            const res = await (0, fetch_1.default)('/sign-out');
            (0, oddlyjs_1.Next)(res.redirect || '/sign-in');
        })();
    }
    nav(e) {
        e.preventDefault();
        (0, oddlyjs_1.Next)(e.currentTarget.href);
    }
    openDropDownMenu() {
        const dropdown = $(`#dropdown-menu`);
        dropdown.removeClass('main-header__nav__ul__item__menu--closed');
        const overlay = $(document.createElement('div'));
        overlay.addClass('overlay');
        overlay.on('click', () => {
            dropdown.addClass('main-header__nav__ul__item__menu--closed');
            overlay.remove();
        });
        document.body.appendChild(overlay[0]);
    }
});


/***/ }),

/***/ "./public/assets/js/src/events/index.ts":
/*!**********************************************!*\
  !*** ./public/assets/js/src/events/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const user_1 = __importDefault(__webpack_require__(/*! ./user */ "./public/assets/js/src/events/user.ts"));
const Plan_1 = __importDefault(__webpack_require__(/*! ./Plan */ "./public/assets/js/src/events/Plan.ts"));
const Opening_1 = __importDefault(__webpack_require__(/*! ./Opening */ "./public/assets/js/src/events/Opening.ts"));
const Foundation_1 = __importDefault(__webpack_require__(/*! ./Foundation */ "./public/assets/js/src/events/Foundation.ts"));
const Search_1 = __importDefault(__webpack_require__(/*! ./Search */ "./public/assets/js/src/events/Search.ts"));
const Roof_1 = __importDefault(__webpack_require__(/*! ./Roof */ "./public/assets/js/src/events/Roof.ts"));
const Util_1 = __importDefault(__webpack_require__(/*! ./Util */ "./public/assets/js/src/events/Util.ts"));
exports["default"] = () => {
    (0, user_1.default)();
    (0, Plan_1.default)();
    (0, Opening_1.default)();
    (0, Foundation_1.default)();
    (0, Search_1.default)();
    (0, Roof_1.default)();
    (0, Util_1.default)();
};


/***/ }),

/***/ "./public/assets/js/src/events/user.ts":
/*!*********************************************!*\
  !*** ./public/assets/js/src/events/user.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const error_container_1 = __webpack_require__(/*! ../helpers/error-container */ "./public/assets/js/src/helpers/error-container.ts");
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
exports["default"] = () => new (class User {
    constructor() {
        new oddlyjs_1.Events(this);
    }
    async signUp(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/sign-up', {
            body: {
                firstname: $('#firstname').val(),
                lastname: $('#lastname').val(),
                email: $('#email-address').val(),
                username: $('#username').val(),
                password: $('#password').val(),
                passwordAgain: $('#password-again').val()
            }
        });
        if (response.successful) {
            oddlyjs_1.Environment.put('userDetails', response.userDetails);
            return (0, oddlyjs_1.Next)('/plans');
        }
        (0, error_container_1.showError)('auth', response.error);
    }
    async signIn(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/sign-in', {
            body: {
                email: $('#email-address').val(),
                password: $('#password').val()
            }
        });
        if (response.successful) {
            oddlyjs_1.Environment.put('userDetails', response.userDetails);
            return (0, oddlyjs_1.Next)('/plans');
        }
        (0, error_container_1.showError)('auth', response.error);
    }
    async update(e) {
        e.preventDefault();
        const response = await (0, fetch_1.default)('/user/update', {
            body: {
                firstname: $('#firstname').val(),
                lastname: $('#lastname').val(),
                email: $('#email-address').val()
            }
        });
        if (response.successful) {
            oddlyjs_1.Environment.put('userDetails', response.userDetails);
            (0, error_container_1.hideError)('profile');
            return (0, oddlyjs_1.Refresh)();
        }
        (0, error_container_1.showError)('profile', response.error);
    }
    async deleteAccount() {
        const response = await (0, fetch_1.default)('/user/delete');
        if (response.successful) {
            (0, oddlyjs_1.Next)('/sign-up');
        }
    }
});


/***/ }),

/***/ "./public/assets/js/src/helpers/error-container.ts":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/helpers/error-container.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hideError = exports.showError = void 0;
const showError = (id, errorMsg) => {
    const parent = $(`#${id}-error`);
    $('p', parent[0]).text(errorMsg);
    parent.show();
};
exports.showError = showError;
const hideError = (id) => {
    const parent = $(`#${id}-error`);
    $('p', parent[0]).text('');
    parent.hide();
};
exports.hideError = hideError;


/***/ }),

/***/ "./public/assets/js/src/helpers/fetch.ts":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/fetch.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchText = void 0;
exports["default"] = async (uri, { method = 'POST', headers = { 'Content-Type': 'application/json;charset=utf-8' }, body = {} } = {}) => {
    const response = await fetch(uri, { method, headers, body: JSON.stringify(body) });
    return await response.json();
};
const fetchText = async (uri, { method = 'POST', headers = { 'Content-Type': 'application/json;charset=utf-8' }, body = {} } = {}) => {
    const response = await fetch(uri, { method, headers, body: JSON.stringify(body) });
    return await response.text();
};
exports.fetchText = fetchText;


/***/ }),

/***/ "./public/assets/js/src/helpers/modal.ts":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/modal.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.closeModal = exports.openModal = void 0;
const openModal = (parent) => {
    $(`#${parent}-modal`).removeClass('modal--closed');
};
exports.openModal = openModal;
const closeModal = (parent) => {
    $(`#${parent}-modal`).addClass('modal--closed');
};
exports.closeModal = closeModal;


/***/ }),

/***/ "./public/assets/js/src/middleware/index.ts":
/*!**************************************************!*\
  !*** ./public/assets/js/src/middleware/index.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const fetch_1 = __importDefault(__webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.ts"));
exports["default"] = () => {
    oddlyjs_1.Middleware.repeat(async (next) => {
        oddlyjs_1.Environment.put('userDetails', (await (0, fetch_1.default)('/user/get/by/session')).details, true);
        next();
    });
};


/***/ }),

/***/ "./public/assets/js/src/routes/base.ts":
/*!*********************************************!*\
  !*** ./public/assets/js/src/routes/base.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const oddlyjs_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'oddlyjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
exports["default"] = () => {
    (0, oddlyjs_1.Route)({
        name: 'home',
        url: '/',
        layoutpath: 'base'
    });
    (0, oddlyjs_1.Route)({
        name: 'search',
        url: '/search',
        layoutpath: 'info'
    });
    (0, oddlyjs_1.Route)({
        name: 'plans',
        url: '/plans',
        layoutpath: 'info'
    });
    (0, oddlyjs_1.Route)({
        name: 'plan.view',
        url: '/plan/view',
        layoutpath: 'info'
    });
    (0, oddlyjs_1.Route)({
        name: 'history',
        url: '/history',
        layoutpath: 'info'
    });
    (0, oddlyjs_1.Route)({
        name: 'profile',
        url: '/profile',
        layoutpath: 'info'
    });
    (0, oddlyjs_1.Route)({
        name: 'sign.up',
        url: '/sign-up',
        layoutpath: 'auth'
    });
    (0, oddlyjs_1.Route)({
        name: 'sign.in',
        url: '/sign-in',
        layoutpath: 'auth'
    });
};


/***/ }),

/***/ "./public/assets/js/src/routes/index.ts":
/*!**********************************************!*\
  !*** ./public/assets/js/src/routes/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __importDefault(__webpack_require__(/*! ./base */ "./public/assets/js/src/routes/base.ts"));
exports["default"] = () => {
    (0, base_1.default)();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./public/assets/js/src/app.ts");
/******/ 	
/******/ })()
;