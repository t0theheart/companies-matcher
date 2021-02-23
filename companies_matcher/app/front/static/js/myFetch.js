async function myFetch(endpoint, method, body, headers, validationErrorHandler) {
    let init = {};
    init.method = method;
    if (body) {
        init.body = JSON.stringify(body)
    }
    if (headers) {
        init.headers = headers
    }
    let response = await fetch(endpoint, init)
    if (response.status === 422) {
        validationErrorHandler()
    } else if (response.status > 500) {
        showMessage("Somethings went wrong...")
    } else {
        return (await response.json()).result;
    }
}