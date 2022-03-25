const { UNPROCESSABLE } = require("../../config/status_code");
const { ParseData } = require("../Helpers/ParseData");
const { Response } = require("../Helpers/Response");

class UserValidator {
    constructor() {
        if (this.constructor == UserValidator) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    static async validateCreate(body, response) {
        if (!body.name) {
            Response.responseJson(response, UNPROCESSABLE, {message: "name field is required !"})
        }
        else if (!body.email) {
            Response.responseJson(response, UNPROCESSABLE, {message: "email field is required !"})
        }
        else if (!body.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            Response.responseJson(response, UNPROCESSABLE, {message: "email must be a valid email !"})
        }
        else if (!body.password) {
            Response.responseJson(response, UNPROCESSABLE, {message: "password field is required !"})
        }
        else if (body.password.length < 8) {
            Response.responseJson(response, UNPROCESSABLE, {message: "password must be at least 8 char long !"})
        }
    }

    static async validateUpdate(body, response) {
        if (!body.name && !body.email && !body.password) {
            Response.responseJson(response, UNPROCESSABLE, {message: "At least one of these following fields are required: name, email, password"})
        }
        else if (body.email && !body.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            Response.responseJson(response, UNPROCESSABLE, {message: "email must be a valid email !"})
        }
        else if (body.password && body.password.length < 8) {
            Response.responseJson(response, UNPROCESSABLE, {message: "password must be at least 8 char long !"})
        }
    }
}

module.exports = {
    UserValidator,
}