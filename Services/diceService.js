// generate random number between 1-6
const diceRoll = () => {
    return Math.floor(Math.random() * 6) + 1
}

module.exports.diceRoll = diceRoll