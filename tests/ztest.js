const Zyre = require('zyre.js')

const zyre = new Zyre()
const finder = new Zyre()

/**
 * Test Basic Zyre Functions
 */

zyre.start(() => {
    zyre.join("hello")
    zyre.on('connect', (id, name, headers) => {
        console.log(id, name, headers)
      })

      zyre.on('shout', (id, name, message, group) => {
        console.log("received: " + typeof message, message)
        process.exit()
      })      
})

finder.start(() => {
    finder.join("hello")
    finder.join("other")
    // finder.on('join', (id, name, group) => {
    //     let groups = finder.getGroups()
    //     console.log(groups)    
    // })
})
console.log('ID:', finder.getIdentity())
finder.on("connect", (id, name, headers) => {
    finder.shout("hello", {world: "world!"})
})
