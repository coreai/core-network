const path = require('path')
const fs = require('fs')
const { fork } = require('child_process')

const directoryPath = path.join(__dirname, '/tests/')

fs.readdir(directoryPath, (err, files) => {
    if (err) console.log(err)
    for( const file of files) {
        if (file === 'utils') return
        console.log(directoryPath + file)
        let child = fork(directoryPath + file, { stdio: ['ignore', 'ignore', 'ignore', 'ipc'] })
        child.send('START')
        child.on('message', message => {
            console.log(message)
            if(message.result) {
                child.kill('SIGINT')
            }
        })        
    }
})

//////
// function Test(file) {
//     return new Promise((resolve, reject) => {
//         if (file === 'utils') resolve()
//         let child = fork(directoryPath + file, { stdio: ['ignore', 'ignore', 'ipc'] })
//         child.on('message', message => {
//             console.log(message)
//             resolve(message)
//         })
//     })
// }

// async function Iterate(files) {
//     await files.reduce(async (previous, current, index) => {
//         try {
//             await previous
//             await Test(current)
//         } catch (error) {
//             console.log(error)
//         }
//     }, Promise.resolve())    
// }

// async function Begin() {
//     return new Promise((resolve, reject) => fs.readdir(directoryPath, (err, files) => {
//         if (err) reject (err)
//         resolve( files)
//     }))
// }

// async function Run() {
//     let tests = await Begin()
//     await Iterate(tests)
// }

