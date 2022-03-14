const { EventEmitter } = require('events')
const Zyre = require('zyre.js')
const { Decode, Encode } = require('./parser')
const { log } = require('./utils')
const { Validate } = require('./validator')

const parameters = { logging: true }
const hears = new EventEmitter()
/**
 * Join the Network and Parameterize
 */
function Connect() {
    const core = new Zyre()
    core.start(() => core.join("core"))
    parameters.name = core.getIdentity()
    parameters.peers = core.getPeers()
    log(parameters, "Core", `Started!`)
    return new Promise.resolve(core)
}

function Listen(core) {
    core.on('whisper', (id, name, message, group) => Heard(message, id))
    core.on('shout', (id, name, message, group) => Heard(message, id))
}

function Heard(message, from) {
    log(parameters, "Heard", message)
    hears.emit('heard', {message, from})
}

/**
 * Create a thought, process and validate before speaking
 * @param {function} func 
 * @param {object} hears 
 * @returns 
 */
function Thoughts(func, hears) {
    return new Promise(async (resolve, reject) => {
        let output
        if (typeof hears === 'object') {
            let input = Validate(parameters, Decode(parameters, hears))
            if (input === false) reject("Invalid input. " + input)
            output = Encode(parameters, await func(input))
        }
        else output = Encode(parameters, await func())
        
        resolve(output) // TODO: output = {say, to}
    })
}

/**
 * Listen first, then speak
 * @param {object} core 
 * @param {function} func 
 */
function Think(core, func) {
    hears.on('heard', hears => Thoughts(func, hears).then(say => Talk(core, say)).catch(Wrong))
}

/**
 * Speak Thoughts, no listening required
 * @param {object} core 
 * @param {function} func 
 */
function Say(core, func) {
    if(func.length === 0) Thoughts(func).then(say => Talk(core, say)).catch(Wrong)
}

/**
 * 
 * @param {String | object} say message to communicate 
 * @param {String} say.message (optional) message to communicate 
 * @param {String} say.to (optional) id of node to send message to
 */
function Talk(core, say) {
    if (typeof say === 'string') core.shout("core", say)
    if (typeof say === 'object' && typeof say.to === 'string' && typeof say.message === 'string') core.whisper(say.to, say.message)
}

function Wrong(err) {
    log(parameters, "Error: ", err)
}

module.exports = { Connect, Listen, Say, Heard, Talk, Think, Wrong }