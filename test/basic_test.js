const assert = require('assert')
const api = require('../src/api/api')

const mocks = [
  {id: '0', name: 'Jhon', data: '!"%$&'},
  {id: '1', name: 'Merle', data: '!"%$&'},
  {id: '2', name: 'Isaac', data: '!"%$&'},
  {id: '3', name: 'Eva', data: '!"%$&'},
  {id: '4', name: 'Kobe', data: '!"%$&'},
  {id: '5', name: 'Michael', data: '!"%$&'}
]

describe('Simple Filter Test', () => {

  it('List filter by id.', (done) => {
    let result = api.filterId(mocks, '3')
    assert.equal(result[0].id, mocks[3].id)
    done()
  })

  it('List filter by name.', (done) => {
    let result = api.filterName(mocks, 'Eva')
    assert.equal(result[0].name, mocks[3].name)
    done()
  })

})