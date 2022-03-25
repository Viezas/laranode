const { CREATED, SUCCESS, NO_CONTENT, NOT_FOUND } = require('../../config/status_code');
const { Hash } = require('../Helpers/Hash');
const { Response } = require('../Helpers/Response');
const { ParseData } = require('../Helpers/ParseData');
const { User } = require('../Models/User');
const { UserValidator } = require('../Validator/UserValidator');

class UserController {
    async index(request, response) {
        try {
            const users = await User.all()
            Response.responseJson(response, SUCCESS, users)
        } catch (error) {
            console.log('Error => ', error);
        }
    }

    async show(request, response, user_id) {
        try {
            const user = await User.find(user_id)
            if (Object.keys(user).length === 0) {
                Response.responseJson(response, NOT_FOUND, {message: 'User not found'})
            } else {
                Response.responseJson(response, SUCCESS, user)
            }
        } catch (error) {
            console.log('Error => ', error);
        }
    }

    async store(request, response) {
        try {
            const body = await ParseData.parseFormData(request)
            UserValidator.validateCreate(JSON.parse(body), response)

            const { name, email, password } = JSON.parse(body)
            const user = { name, email, password }
            const newUser = await User.create(user)
            Response.responseJson(response, CREATED, newUser)
        } catch (error) {
            console.log(error);
        }
    }

    async update(request, response, user_id) {
        try {
            let user = await User.find(user_id, true)
            if (!user) {
                Response.responseJson(response, NOT_FOUND, {message: 'User not found'})
            } else {
                const body = await ParseData.parseFormData(request)
                UserValidator.validateUpdate(JSON.parse(body), response)
                const { name, email, password } = JSON.parse(body)
                user = { 
                    name: name || user[0].name, 
                    email: email || user[0].email, 
                    password: (password ? Hash.hashPassword(password) : user[0].password),
                }
                const updated_user = await User.update(user, user_id)
                Response.responseJson(response, SUCCESS, updated_user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(request, response, user_id) {
        try {
            const user = await User.find(user_id)
            if (Object.keys(user).length === 0) {
                Response.responseJson(response, NOT_FOUND, {message: 'User not found'})
            } else {
                await User.destroy(user_id)
                Response.responseJson(response, NO_CONTENT)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = {
    UserController,
}