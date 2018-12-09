const express = require('express')
const url = require('url')
const api = require('./api/api')

let router = express.Router()

/*
 *  GET Main
 */
router.get('/', (req, res) => {
  res.send('<h1>Assestment Web API running...</h1>')
})

/*
 *  GET List of users
 */
router.get('/users', (req, res) => {
  api.getUserList()
    .then((data) => { res.send(data) })
    .catch((err) => {
      res.status(500).send(err)
      console.log(err)
    })
})

/*
 *  GET Users by id
 */
router.get('/users/id/:id', (req, res) => {

  let id = req.params.id

  if (id) {
    api.getUserById(id)
      .then(data => { res.send(data) })
      .catch(err => {
        res.status(500).send('Something was wrong!')
        console.log(err)
      })
  } else {
    res.send('User id required.')
  }

})

/*
 *  GET Users by name
 */
router.get('/users/name/:name', (req, res) => {
  let name = req.params.name

  if (name) {
    api.getUserByName(name)
      .then((data) => { res.send(data) })
      .catch((err) => {
        res.status(500).send('Something was wrong!')
        console.log(err)
      })

  } else {
    res.send('User id required.')
  }

})

/*
 *  GET Policies
 */
router.get('/policies', (req, res) => {

  let urlParams = url.parse(req.url, true)

  let params = {
    userId: urlParams.query.id,
    clientName: urlParams.query.client,
    policy: urlParams.query.policy
  }

  if (params.userId && (params.clientName || params.policy)) {

    if (params.clientName) {
      api.getUserById(params.userId)
        .then((user) => {
          if (user.length > 0 && user[0].role === 'admin') {
            return api.getUserNamePolicies(params.clientName)
          } else {
            res.status(401).send('Unauthorized')
          }
        })
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          res.status(500).send('Something was wrong!')
          console.log(err)
        })

    } else if (params.policy) {
      api.getUserById(params.userId)
        .then((user) => {
          if (user.length > 0 && user[0].role === 'admin') {
            return api.getUserPolicieId(params.policy)
          } else {
            res.status(401).send('Unauthorized')
          }
        })
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          res.status(500).send('Something was wrong!')
          console.log(err)
        })
    }
  } else {
    res.send('Missed user or client url parameters')
  }
})

module.exports = router
