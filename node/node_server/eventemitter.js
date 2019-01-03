const event = require('events')
const myemitter = new event.EventEmitter()
myemitter.on('error', err => {
  console.log(`error:${err.message}`)
})
// myemitter.emit('error', new Error('something is wrong'))
myemitter.emit('error')
process.on('uncaughtException', err => {
  console.log('----err----:', err.stack)
  process.exit()
})
