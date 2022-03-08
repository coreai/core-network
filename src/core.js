const Zyre = require('zyre.js')
const { Decode, Encode } = require('./parser')
const { log } = require('./utils')
const { Validate } = require('./validator')

const parameters = { logging: true }

/**
 * convert inputs and outputs into network messages
 * @param {*} func 
 * 
 */
function Core(func) {
    const core = new Zyre()
    core.start(() => core.join("core"))


    log(parameters, "Core", "Started!")

    if (func.length === 0) {
        Run(func)
            .then(output => core.shout("core", output))
            .catch(err => log(parameters, "Run Error:", err))

    }

    core.on('shout', async (id, name, message, group) => {
        log(parameters, "Heard", message)
        Run(func, message)
            .then(output => core.shout("core", output))
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