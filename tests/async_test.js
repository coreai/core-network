const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "async_test"

function start() {
    return new Promise(resolve => setTimeout(() => resolve(0), 1000))
}

function tester(data) {
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
    if (typeof data === 'number') {
        let count = await tester(data)
        return count
    }

}

function async_test(callback) {
    let passes = 4
    Core(data => node(data, passes, callback))
    Core(data => node(data, passes, callback))
    Core(start)
}

run(async_test)