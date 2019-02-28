/**
 * @description Please note that if you're developing a local server and don't expect to get concurrent requests, it's often easier to use file-sync storage, which is the default.
 * But if you need to avoid blocking requests, you can do so by using file-async storage.
 */

const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

// 可以使用 shortid 和 lodash-id 为数据库中的每一条记录创建唯一的id索引，然后通过id检索操作记录：

const shortid = require('shortid')

// Create server
const app = express()
app.use(bodyParser.json())

// Create database instance and start server
const adapter = new FileAsync('db.json')
low(adapter)
  .then(db => {
    // Routes
    // get post list
    app.get('/posts', (req, res) => {
      const posts = db.get('posts').value()
      console.log('-----posts all----', posts)
      res.send(posts)
    })
    // GET /posts/:id
    app.get('/posts/:id', (req, res) => {
      const id = req.params.id
      const post = db
        .get('posts')
        .find({ id })
        .value()
      console.log('-----posts req.params.id----', db.get('posts').find({ id }))
      res.send(post)
    })
    // POST /posts/add
    app.post('/posts/add', (req, res) => {
      const posts = db
        .get('posts')
        .push(req.body)
        .last()
        .assign({
          title: Date.now().toString(),
          name: `${shortid.generate()}`,
          id: shortid.generate()
        })
        .write()
        .then(post => res.send(post))
    })
    // update by id POST /posts/:id
    app.post('/posts/update/:id', (req, res) => {
      const id = req.params.id
      const { name } = req.body
      db.get('posts')
        .find({ id })
        .assign({ name })
        .write()
      console.log('---body name update by id POST----:', name)
    })

    // delete by id
    app.delete('/posts/:id', (req, res) => {
      // const id = Number(req.params.id)
      const id = req.params.id
      const posts = db
        .get('posts')
        .remove({
          id
        })
        .value()
      console.log('---remove name update by id POST----:', id, posts)
      res.send(posts)
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
