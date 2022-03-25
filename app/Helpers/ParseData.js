class ParseData {
    constructor() {
        if (this.constructor == ParseData) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    static parseFormData(request) {
        return new Promise((resolve, reject) => {
            try {
                let body = '';
                request.on('data', (chunk) => {
                    body += chunk.toString()
                })

                request.on('end', async () => {
                    resolve(body)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = {
    ParseData,
}