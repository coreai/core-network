const { Core } = require('./main')
// function testGenerator() {
//     return "Hello! now: " + Date.now()
// }

// function testListener(data) {
//     // have to process for all possible inputs
//     console.log("Heard: ", data)
// }

// Core(testListener)
// // Core(testGenerator, { generator: 1000 })
// Core(testGenerator, { generator: true })

const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i])

/**
 * Generator Test - Interval
 */
function generator_test() {
    let count = 0
    let total = 3

    let result = false
    let expected = []
    console.log('preparing generator test...')
    do {
        count++
        expected.push(count)
    } while (expected.length < total)
    expected.push('done')

    console.log("expected: ", expected)
    count = 0

    let publisher = Core(() => {
        if (count >= total) {
            clearInterval(publisher)
            console.log(publisher)
            return 'done'
        }
        if (count < total) count++
        return count
    }, { generator: 1000 })


    let heard = []
    Core(data => {
        console.log("Heard: ", data)
        heard.push(data)
        if(data === 'done') {
            result = equals(expected, heard)
            console.log("test result: ", result)
        }
    })
}

generator_test()