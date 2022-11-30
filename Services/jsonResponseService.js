let createJsonResponse = (data, success = true, msg = '', code = 200) => {
    return {
        success: success,
        msg: msg,
        code: code,
        data: data
    }
}

module.exports = createJsonResponse