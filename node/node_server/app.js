const http = require('http')
const fs = require('fs')
http
  .createServer((req, res) => {
    if (req.url === '/') {
      fs.readFile('./title.json', (err, data) => {
        if (err) {
          console.error(err)
          res.end('server errir')
        } else {
          const titles = JSON.parse(data.toString())
          fs.readFile('./template.html', (err, data) => {
            if (err) {
              console.error(err)
              res.end('server error')
            } else {
              const tmpl = data.toString()
              const html = tmpl.replace('%', titles.join('</li><li>'))
              console.log('----html-----', html)
              res.writeHead(200, { 'Content-Type': 'text/html' })
              res.end(html)
            }
          })
        }
      })
    }
  })
  .listen(8082, '127.0.0.1', () => {
    console.log('---listening port ----: 8082')
  })
