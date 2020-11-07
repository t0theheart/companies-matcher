function setCacheJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getCacheJson(key) {
    let value = localStorage.getItem(key)
    return JSON.parse(value)
}