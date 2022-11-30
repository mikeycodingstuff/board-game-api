const createJsonResponse = require('../Services/jsonResponseService')
const getCollection = require('../Services/dbService')
const playerService = require('../Services/playerService')
const diceService = require('../Services/diceService')
const refereeService = require('../Services/refereeService')
const validationService = require('../Services/validationService')

const getAllPlayers = async (req, res) => {
    // return all players with info
    const collection = await getCollection()
    const allPlayers = await playerService.getAllPlayers(collection)
    res.json(createJsonResponse(allPlayers))
}

const addPlayer = async (req, res) => {
    // check if player name exists
    const playerName = req.body.name

    if (validationService.validateNameLength(playerName)) {
        // connect to db and find previous player to get order
        const collection = await getCollection()
        const playersInDb = await playerService.playersInDb(collection)
        
        // if there are players in the db get the previous player and give the new player the previous order +1
        if (playersInDb) {
            const previousPlayer = await playerService.getPreviousPlayerOrder(collection)
            playerOrder = parseInt(previousPlayer + 1)
            // otherwise give order 1
        } else {
            playerOrder = 1
        }

        // create new player object
        newPlayer = playerService.createPlayerObject(playerName, playerOrder)
        
        // store it in the db
        playerService.insertPlayerInDb(collection, newPlayer)

        // return player info
        res.json(createJsonResponse(newPlayer, 'player added'))
   } else {
        res.json(createJsonResponse('', false, 'please provide a valid name', 400))
   }
}

const playerTurn = async (req, res) => {
    const playerIdObject = playerService.createPlayerIdObject(req)
    const collection = await getCollection()
    
    let diceRoll = diceService.diceRoll()
    
    // increment position by that number
    // update players postion in db
    await playerService.updatePlayerPosition(collection, playerIdObject, diceRoll)
    
    // check to see if above 30
    // add player order to referee's lastPlayerOrder
    
    let result = await playerService.getPlayerId(collection, playerIdObject)
    await refereeService.updateRefLastPlayerOrder(collection, result[0].order)

    // set winner
    await playerService.setWinner(collection, playerIdObject, result)

    // update 
    result = await playerService.getPlayerId(collection, playerIdObject)

    // return player info
    res.json(createJsonResponse(result))
}

module.exports.getAllPlayers = getAllPlayers
module.exports.addPlayer = addPlayer
module.exports.playerTurn = playerTurn