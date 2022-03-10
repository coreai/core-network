const Zyre = require('zyre.js')
const { Decode, Encode } = require('./parser')
const { log } = require('./utils')
const { Validate } = require('./validator')

const parameters = { logging: false }

/**
 * convert inputs and outputs into network messages
 * @param {*} func 
 * 
 */
function Core(func, group="core") {
    const core = new Zyre()
    if(typeof group === "string") core.start(() => core.join(group))
    // else if (Array.isArray(groups)) groupscore.start(() => groups.map(group => core.join(group)))

    log(parameters, "Core", "Started!")

    if (func.length === 0) {
        Run(func)
            .then(output => core.shout(group, output))
            .catch(err => log(parameters, "Run Error:", err))

    }

    core.on('shout', async (id, name, message, group) => {
        log(parameters, "Heard", message)
        Run(func, message)
            .then(output => core.shout(group, output))
            .catch(err => log(parameters, "Run Error: ", err))
    })
    
}



function Run(func, message) {
    return new Promise(async (resolve, reject) => {
        let input, output
        if (message) {
            
            let data = Validate(parameters, Decode(parameters, message))
            if(data === false) {
                reject("Invalid Data. " + data)
                return
            }  
            output = Encode(parameters, await func(data))
        }
        else output = Encode(parameters, await func())
    
        resolve(output)
    })


}

module.exports = { Core }