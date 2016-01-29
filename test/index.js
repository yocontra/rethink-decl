/*global it: true, describe: true */
/*eslint no-console: 0*/
import should from 'should'
import createModel from './fixtures/createModel'
import decl from '../src'

const createUser = () =>
  createModel(`U${Math.random()}`, {
    name: String,
    bday: Date
  })

describe('rethink-decl', () => {
  it('should export a function', (done) => {
    should.exist(decl)
    decl.should.be.a.function
    done()
  })

  it.skip('should turn limit into a query', () => {
    let User = createUser()
    let opt = {
      limit: 5
    }
    let q = decl(User, opt)
    // TODO: this object is unwieldy
    console.log(q)
  })
  it.skip('should turn offset into a query', () => {
    let User = createUser()
    let opt = {
      offset: 99,
      name: 'Eric'
    }
    let q = decl(User, opt)
    // TODO: this object is unwieldy
    console.log(q)
  })
})
