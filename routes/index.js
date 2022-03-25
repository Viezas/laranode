const { UserController } = require('../app/Controller/UserController');
const { RESPONSE_CONTENT_TYPE } = require('../config/app');
const { NOT_FOUND } = require('../config/status_code');

function route(request, response) {
    const userController = new UserController();
    if (request.url === '/api/user' && request.method === 'GET') {
        userController.index(request, response)
    } 
    else if(request.url.match(/\/api\/user\/([0-9]+)/)  && request.method === 'GET') {
        const user_id = request.url.split('/')[3]
        userController.show(request, response, user_id)
    } 
    else if(request.url == '/api/user' && request.method === 'POST') {
        userController.store(request, response)
    } 
    else if(request.url.match(/\/api\/user\/([0-9]+)/)  && request.method === 'PUT') {
        const user_id = request.url.split('/')[3]
        userController.update(request, response, user_id)
    } 
    else if(request.url.match(/\/api\/user\/([0-9]+)/)  && request.method === 'DELETE') {
        const user_id = request.url.split('/')[3]
        userController.destroy(request, response, user_id)
    } 
    else {
        response.writeHead(NOT_FOUND, RESPONSE_CONTENT_TYPE)
        response.end(JSON.stringify({message: "Route not found"}))
    }
}

module.exports = {
    route,
}