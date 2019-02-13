const express = require('express')
const app = new express()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [], user: {}, count: 0 }).write()

// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome' })
  .write()

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicodeupdate').write()

// Increment count
db.update('count', n => n + 1).write()

app.get('/', (req, res) => {
  // For performance, use .value() instead of .write() if you're only reading from db
  const obj = db
    .get('posts')
    .find({ id: 1 })
    .value()
  res.send(`hello world${obj.title}r`)
})
app.listen(4000, () => {
  console.log('express listen prot 4000')
})
