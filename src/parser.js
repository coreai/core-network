function Parser(data) {
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

module.exports = { Parser }