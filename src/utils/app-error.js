export default class {
    constructor(errorCode, errorText) {
        this._code = errorCode;
        this._error = errorText;
    }
    get code() {
        return this._code;
    }
    get text() {
        return this._error;
    }
    get json() {
        return this._json;
    }
}
