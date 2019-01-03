const express = require('express')
const app = new express()
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(4000, () => {
  console.log('express listen prot 4000')
})
