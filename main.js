const { Connect, Listen, Say, Think, Wrong } = require('./src/core')

function Core(func) {
    try {
        const core = await Connect()
        Say(core, func)
        Listen(core)
        Think(core, func)
    } catch (error) { Wrong(error) }
}

module.exports = { Core }