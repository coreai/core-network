const { Connect, Listen, Say, Heard, Talk, Think, Wrong } = require('./src/core')
const { log } = require('./src/utils')

function Core(func) {
    Connect().then(core => {
        Say(core, func)
        Listen(core)
        Think(core, func)
    }).catch(Wrong)
}

module.exports = { Core, log }