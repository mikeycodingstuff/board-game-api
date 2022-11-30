const addOrderToArray = async (allPlayers, orders) => {
    allPlayers.forEach(player => {
        orders.push(player.order)
    })
}

// put orders in referee in db
const updateOrders = async (collection, orders) => {
    return await collection.updateOne({role: 'referee'}, {$set: {orders: orders}})
}

const getReferee = async (collection) => {
    return await collection.find({role: 'referee'}).toArray()
}

const updateRefLastPlayerOrder = async (collection, resultOrder) => {
    return await collection.updateOne({role: 'referee'}, {$set: {lastPlayerOrder: resultOrder}})
}

const resetOrders = async (collection) => {
    return await collection.updateOne({role: 'referee'}, {$set: {orders: []}})
}

const resetRefLastPlayerOrder = async (collection) => {
    return await collection.updateOne({role: 'referee'}, {$set: {lastPlayerOrder: 0}})
}

module.exports.addOrderToArray = addOrderToArray
module.exports.updateOrders = updateOrders
module.exports.getReferee = getReferee
module.exports.updateRefLastPlayerOrder = updateRefLastPlayerOrder
module.exports.resetOrders = resetOrders
module.exports.resetRefLastPlayerOrder = resetRefLastPlayerOrder