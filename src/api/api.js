const R = require('ramda')
const request = require('request')

const storeClientsUrl = 'http://www.mocky.io/v2/5808862710000087232b75ac'
const storePoliciesUrl = 'http://www.mocky.io/v2/580891a4100000e8242b75c5'

///////////////////////////////////////////////////////////////////
//
// Auxiliary Methods
//
///////////////////////////////////////////////////////////////////

/*
 *  Filters a list by id property
 */
const filterId = (data, id) => {
  if (data && id) {
    return R.filter(R.where({id: R.contains(id)}))(data)
  }
}

/*
 *  Filters a list by name property
 */
const filterName = (data, name) => {
  if (data && name) {
    return R.filter(R.where({name: R.contains(name)}))(data)
  }
}

/*
 *  Filters a list by clientId property
 */
const filterClientId = (data, id) => {
  if (data && id) {
    return R.filter(R.where({clientId: R.contains(id)}))(data)
  }
}

///////////////////////////////////////////////////////////////////
//
// Data retrieve
//
///////////////////////////////////////////////////////////////////

/*
 *  Retrieves a list of current clients
 */
const getUserList = () => {
  return new Promise((resolve, reject) => {
    request(storeClientsUrl, (err, res) => {
      if (err) reject(err)
      resolve(JSON.parse(res.body))
    })
  })
}

/*
 *  Retrieves the policies list
 */
const getPoliciesList = () => {
  return new Promise((resolve, reject) => {
    request(storePoliciesUrl, (err, res) => {
      if (err) reject(err)
      resolve(JSON.parse(res.body))
    })
  })
}

/*
 *  Looks for a client id on list
 */
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    getUserList()
      .then((data) => {
        resolve(filterId(data.clients, id))
      })
      .catch(reject)
  })
}

/*
 * Looks for a client name on list
 */
const getUserByName = (name) => {
  return new Promise((resolve, reject) => {
    getUserList()
      .then((data) => {
        resolve(filterName(data.clients, name))
      })
      .catch(reject)
  })
}

/*
 *  Looks for a user linked policy by user id
 */
const getPoliciesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    getPoliciesList()
      .then((data) => {
        resolve(filterClientId(data.policies, userId))
      })
      .catch(reject)
  })

}

/*
 *  Looks for policy by id
 */
const getPoliciesById = (userId) => {
  return new Promise((resolve, reject) => {
    getPoliciesList()
      .then((data) => {
        resolve(filterId(data.policies, userId))
      })
      .catch(reject)
  })

}

/*
 *  Get policies linked to a user by user name
 */
const getUserNamePolicies = (name) => {
  return new Promise((resolve, reject) => {
    getUserByName(name)
      .then((user) => {
        if (user.length > 0) {
          return getPoliciesByUserId(user[0].id)
        } else {
          return Promise.resolve([])
        }
      })
      .then(resolve)
      .catch(reject)
  })
}

/*
 *  Looks for a user linked to a policy
 */
const getUserPolicieId = (id) => {
  return new Promise((resolve, reject) => {
    getPoliciesById(id)
      .then((policy) => {
        if (policy.length > 0) {
          return getUserById(policy[0].clientId)
        } else {
          return Promise.resolve([])
        }
      })
      .then(resolve)
      .catch(reject)
  })
}

module.exports = {
  filterId,
  filterName,
  filterClientId,

  getUserList,
  getPoliciesList,

  getUserById,
  getUserByName,

  getUserNamePolicies,
  getUserPolicieId
}