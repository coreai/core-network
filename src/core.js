const Zyre = require('zyre.js')
const { Decode, Encode } = require('./parser')
const { log } = require('./utils')
const { Validate } = require('./validator')

const parameters = { logging: true }

/**
 * convert inputs and outputs into network messages
 * @param {function} func 
 * @param {object} params
 * @param {string} params.listen group name to listen for inputs [default: "core"]
 * @param {string} params.returns return output group name, [default: func.name]
 */
function Connect(func, {listen, returns} = {}) {
    if(!listen) listen = "core"
    if(!returns) returns = func.name ? func.name : "core"
    const core = new Zyre()
     core.start(() => {
        if(typeof listen === "string") core.join(listen)
        if(typeof returns === "string") core.join(returns)
    })
    
    // else if (Array.isArray(groups)) groupscore.start(() => groups.map(group => core.join(group)))

    parameters.name = core.getIdentity()
    log(parameters, "Core", `Started! ${listen} | ${returns}`)

    if (func.length === 0) {
        Run(func)
            .then(output => core.shout(returns, output))
            .catch(err => log(parameters, "Run Error:", err))
    }

    core.on('shout', async (id, name, message, group) => {
        log(parameters, "Heard", message)
        Run(func, message)
            .then(output => core.shout(returns, output))
            .catch(err => log(parameters, "Run Error: ", err))
    })
    
}



function Run(func, message) {
    return new Promise(async (resolve, reject) => {
        let output
        if (message) {
            let input = Validate(parameters, Decode(parameters, message))
            if(input === false) {
                reject("Invalid input. " + input)
                return
            }  
            output = Encode(parameters, await func(input))
        }
        else output = Encode(parameters, await func())
    
        resolve(output)
    })


}

module.exports = { Run, Connect }