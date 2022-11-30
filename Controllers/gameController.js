const getCollection = require('../Services/dbService')
const playerService = require('../Services/playerService')
const refereeService = require('../Services/refereeService')
const createJsonResponse = require('../Services/jsonResponseService')

const startNewGame = async (req, res) => {
    const collection = await getCollection()
    await playerService.deleteAllPlayers(collection)
    await refereeService.resetOrders(collection)
    await refereeService.resetRefLastPlayerOrder(collection)
    res.json(createJsonResponse('', true, 'new game started', 400))
}

module.exports.startNewGame = startNewGame