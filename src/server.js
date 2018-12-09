const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const port = 8080

let app

const init = () => {

  return new Promise((resolve, reject) => {
    app = express()
    app.use(bodyParser.json())
    app.use(router)

    let httpServer = app.listen(port, (err) => {
      if (err) reject(err)
      else {
        let address = httpServer.address()
        console.log(`API listening at port ${address.port}`)
        resolve()
      }
    })
  })
}

module.exports = {
  init,
  getApp: () => app
}
