let response = {
    get body() {
        return this._body
    },
    set body(value) {
        this._body = value
    }
}
module.exports = response;