const cote = require('cote')

function Publisher(options) {
    const publisher = new cote.Publisher(options)
    return publisher
}


module.exports = { Publisher }