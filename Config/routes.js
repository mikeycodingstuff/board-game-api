const orderMiddleware = require('../Middleware/orderMiddleware')
const playerController = require('../Controllers/playerController')
const gameController = require('../Controllers/gameController')
const createJsonResponse = require('../Services/jsonResponseService')

const routes = (app) => {
    app.get('/players', playerController.getAllPlayers)
    app.post('/players', playerController.addPlayer)
    app.put('/players/:id', orderMiddleware, playerController.playerTurn)
    app.delete('/game', gameController.startNewGame)

    // unsupported
    let unsupportedRoute = (req, res) => {
        res.json(createJsonResponse([], false, 'unsupported route', 300))
    }

    app.put('/players', unsupportedRoute)
    app.delete('/players', unsupportedRoute)

    app.post('/players/:id', unsupportedRoute)
    app.put('/players/:id', unsupportedRoute)
    app.delete('/players/:id', unsupportedRoute)

    app.post('/game', unsupportedRoute)
    app.put('/game', unsupportedRoute)
    app.get('/game', unsupportedRoute)
}

module.exports = routes