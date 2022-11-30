const validateNameLength = (name) => {
    const validNameString = /^[a-zA-Z0-9\s]{1,50}$/
    if (name) {
        if(!name.match(validNameString) || name === '' ) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}

module.exports.validateNameLength = validateNameLength