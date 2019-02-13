/**
 * @description Please note that if you're developing a local server and don't expect to get concurrent requests, it's often easier to use file-sync storage, which is the default.
 * But if you need to avoid blocking requests, you can do so by using file-async storage.
 */

const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

// Create server
const app = express()
app.use(bodyParser.json())

// Create database instance and start server
const adapter = new FileAsync('db.json')
low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id
    app.get('/posts/:id', (req, res) => {
      const id = Number(req.params.id)
      const post = db
        .get('posts')
        .find({ id })
        .value()
      console.log('-----posts req.params.id----', id)
      res.send(post)
    })

    // POST /posts
    app.post('/posts', (req, res) => {
      db.get('posts')
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(post => res.send(post))
    })

    // Set db default values
    return db
      .defaults({
        posts: [
          {
            id: 222,
            title: 'i am a default'
          }
        ]
      })
      .write()
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  })
