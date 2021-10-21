const { Core } = require('../main')

function generator_test(callback) {
    let result = false
    let publisher = Core(() => "generator_test_" + Date.now())

    let subscriber = Core(data => {
        let expected = "generator_test_" + Date.now()
        if(data === expected) result = true
        callback(result)
    })
}

generator_test(result => console.log(result))
