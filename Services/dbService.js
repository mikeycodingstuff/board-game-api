const MongoClient = require('mongodb').MongoClient

const url = "mongodb://root:password@localhost:27017"

const getCollection = async () => {
    const connection = await MongoClient.connect(url)
    const db = connection.db('board-game')
    const collection = db.collection('cuttlefish-board-game')
    return collection
}

module.exports = getCollection