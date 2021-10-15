function Parser(data, name) {
    try {
        if (typeof data === 'string') {
            return JSON.parse(data)
        }
    } catch (error) {
        try {
            return JSON.stringify(data)
        } catch (error) {
            return data
        }
    }
}

module.exports = { Parser }