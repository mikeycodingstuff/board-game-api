const ObjectId = require('mongodb').ObjectId

const getAllPlayers = async (collection) => {
    return await collection.find({role: 'player'}).toArray()
}

const getPreviousPlayerOrder = async (collection) => {
    const previousPlayer = await collection.find({role: 'player'}).sort({ "order": -1 }).limit(1).toArray()
    return previousPlayer[0].order
}

const playersInDb = async (collection) => {
    const allPlayers = await collection.find({role: 'player'}).toArray()
    return (allPlayers.length ? true : false)
}

const createPlayerObject = (name, playerOrder) => {
    return {
        name: name,
        position: 1,
        winner: false,
        order: playerOrder,
        role: 'player'
    }
}

const insertPlayerInDb = async (collection, player) => {
    return await collection.insertOne(player)
}

const createPlayerIdObject = (req) => {
    return {_id: ObjectId(req.params.id)}
}

const getPlayerId = async (collection, currentPlayerId) => {
    return await collection.find(currentPlayerId).toArray()
}

const setWinner = async (collection, playerIdObject, result) => {
    console.log(result[0].position)
    if (result[0].position >= 30) {
        await collection.updateOne(playerIdObject, {$set: {winner: true}})
    } else {
        await collection.updateOne(playerIdObject, {$set: {winner: false}})
    }
}

const deleteAllPlayers = async (collection) => {
    return await collection.deleteMany({role: 'player'})
}

const updatePlayerPosition = async (collection, playerIdObject, diceRoll) => {
    await collection.updateOne(playerIdObject, {$inc: {position: diceRoll}})
}

module.exports.getAllPlayers = getAllPlayers
module.exports.getPreviousPlayerOrder = getPreviousPlayerOrder
module.exports.playersInDb = playersInDb
module.exports.createPlayerObject = createPlayerObject
module.exports.insertPlayerInDb = insertPlayerInDb
module.exports.createPlayerIdObject = createPlayerIdObject
module.exports.getPlayerId = getPlayerId
module.exports.setWinner = setWinner
module.exports.deleteAllPlayers = deleteAllPlayers
module.exports.updatePlayerPosition = updatePlayerPosition