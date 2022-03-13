const Zyre = require('zyre.js')
const { Decode, Encode } = require('./parser')
const { log } = require('./utils')
const { Validate } = require('./validator')

const parameters = { logging: true }

/**
 * convert inputs and outputs into network messages
 * @param {function} func 
 */
function Connect(func) {
    const core = new Zyre()
    core.start(() => core.join("core"))
    parameters.name = core.getIdentity()
    parameters.peers = core.getPeers()
    log(parameters, "Core", `Started!`)


    if (func.length === 0) Think(func).then(Talk).catch(Wrong)

    core.on('whisper', Heard)
    core.on('shout', Heard)
}


function Heard(id, name, message, group) {
    log(parameters, "Heard", message)
    //TODO: need to pass function here
    Think(func, message).then(Talk).catch(Wrong)  
}

/**
 * 
 * @param {String | object} say message to communicate 
 * @param {String} say.message (optional) message to communicate 
 * @param {String} say.to (optional) id of node to send message to
 */
function Talk(say) {
    if(typeof say === 'string') core.shout("core", say)
    if(typeof say === 'object' && typeof say.to === 'string' && typeof say.message === 'string')core.whisper(say.to, say.message)
}

function Think(func, message) {
    return new Promise(async (resolve, reject) => {
        let output
        if (message) {
            let input = Validate(parameters, Decode(parameters, message))
            if (input === false) {
                reject("Invalid input. " + input)
                return
            }
            output = Encode(parameters, await func(input))
        }
        else output = Encode(parameters, await func())

        resolve(output)
    })


}

function Wrong(err) {
    log(parameters, "Error: ", err)
}

module.exports = { Connect }