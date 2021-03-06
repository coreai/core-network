const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "fully_connected_test"

function start() {
    return new Promise(resolve => setTimeout(() => resolve(0), 1000))    
}

function tester (data) {
    return new Promise(resolve => setTimeout(() => {
        data++
        resolve(data)
    }, 1000))
}

async function node(data, passes, callback) {
    console.log(data)
    if (data === passes) return 'done'
    if (data === 'done') {
        callback(true)
        return 
    }
    if(typeof data === 'number') {
        let count = await tester(data)
        return count
    }
}

function fully_connected_test(callback) {
    let passes = 4
    Core(data => node(data, passes, callback),{listen: namespace, returns: namespace})
    Core(data => node(data, passes, callback),{listen: namespace, returns: namespace})
    Core(start, {returns: namespace})
}

run(fully_connected_test)