const { log } = require('./utils')

function Decode(parameters, data) {
    log(parameters, `Decoding {${typeof data}}`, data)
    try {
        if (typeof data === 'string') return Parse(data) 
        else return data
    } catch (error) { 
        try { return JSON.stringify(data) }
        catch (error) { return }
    }
}

function Encode(parameters, data){
    log(parameters, `Encoding {${typeof data}}`, data)
    try{ return JSON.stringify(data) } 
    catch (error) { return }
}

function Parse(data) {
    try {
        let int = parseInt(data)
        if(isNaN(int)) return JSON.parse(data)
        else return int
    } catch (error) {
        return
    }

}

module.exports = { Encode, Decode }