const createJsonResponse = require('../Services/jsonResponseService')
const getCollection = require('../Services/dbService')
const playerService = require('../Services/playerService')
const refereeService = require('../Services/refereeService')

const orderMiddleware = async (req, res, next) => {
    // get all players from db (not ref)
    const collection = await getCollection()
    const allPlayers = await playerService.getAllPlayers(collection)

    // create empty orders array and put players orders inside
    let orders = []
    refereeService.addOrderToArray(allPlayers, orders)
    await refereeService.updateOrders(collection, orders)

    // get referee and current player
    const referee = await refereeService.getReferee(collection)
    const highestOrder = Math.max(...referee[0].orders)
    const currentPlayerId = playerService.createPlayerIdObject(req)
    const currentPlayer = await playerService.getPlayerId(collection, currentPlayerId)

    // check who's go it is
    // compare current player order and referee last player order
    if (referee[0].lastPlayerOrder === highestOrder) {
        if (currentPlayer[0].order === 1) {
            next()
        } else {
            res.json(createJsonResponse('', false, 'not your go', 400))
        }
    } else if (currentPlayer[0].order === referee[0].lastPlayerOrder + 1) {
        next()
    } else {
        res.json(createJsonResponse('', false, 'not your go', 400))
    }
}

module.exports = orderMiddleware