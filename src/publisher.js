const cote = require('cote')

let publisher

function Publisher(options, data) {
    if(!publisher) publisher = new cote.Publisher(options)
    console.log("Publishing on: ", options.broadcasts[0] )
    publisher.publish(options.broadcasts[0], JSON.stringify(data))
}   


module.exports = { Publisher }