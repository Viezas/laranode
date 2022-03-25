class Hash {
    constructor() {
        if (this.constructor == Hash) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    static hashPassword(password) {
        return require('crypto').createHash('md5').update(password).digest("hex")
    }
}

module.exports = {
    Hash,
}