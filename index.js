const http = require('http')
const { PORT } = require('./config/app')
const { route } = require('./routes')

const server = http.createServer((request, response) => {
    route(request, response)
})
server.listen(PORT)