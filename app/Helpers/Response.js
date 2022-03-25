const { RESPONSE_CONTENT_TYPE_JSON } = require("../../config/app");

class Response {
    constructor() {
        if (this.constructor == Response) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    static responseJson(response, status_code, data = {}) {
        response.writeHead(status_code, RESPONSE_CONTENT_TYPE_JSON)
        response.end(JSON.stringify(data))
    }
}

module.exports = {
    Response,
}