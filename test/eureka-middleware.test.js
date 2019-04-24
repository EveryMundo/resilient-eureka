require('tap').mochaGlobals()

const { expect } = require('chai')

describe('eureka-middleware.js', () => {
  it('should export a function', () => {
    const eurekaMiddleware = require('../eureka-middleware')
    expect(eurekaMiddleware).to.be.instanceof(Function)
  })

  it('should be named as eurekaMiddleware', () => {
    const eurekaMiddleware = require('../eureka-middleware')
    expect(eurekaMiddleware).to.have.property('name', 'eurekaMiddleware')
  })

  it('should export mapServersFromEurekaResponse', () => {
    const eurekaMiddleware = require('../eureka-middleware')
    expect(eurekaMiddleware).to.have.property('mapServersFromEurekaResponse')
    expect(eurekaMiddleware.mapServersFromEurekaResponse).to.be.instanceof(Function)
  })
})
