const { writeDataToFile } = require('../../utile')
const { UserRepository } = require('../Repository/UserRepository')

class User extends UserRepository {}
module.exports = {
    User,
}

