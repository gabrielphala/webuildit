export const showError = (id: string, errorMsg: string) => {
    const parent = $(`#${id}-error`);

    $('p', parent[0]).text(errorMsg)

    parent.show()
}

export const hideError = (id: string) => {
    const parent = $(`#${id}-error`);

    $('p', parent[0]).text('')

    parent.hide()
}