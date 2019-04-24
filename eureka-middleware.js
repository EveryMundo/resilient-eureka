const xml2js = require('xml2js')

function mapServersFromEurekaResponse (data, params) {
  return data
    .applications
    .application
    .filter(service => params.serviceName ? service.name[0] === params.serviceName : true)
    .map(service => service.instance)
    .reduce((flat, toFlatten) =>
      flat.concat(toFlatten), [])
    .filter(service => params.serviceVipAddress ? service.vipAddress[0] === params.serviceVipAddress : true)
    .map(service => params.protocol || 'http' + '://' + service.ipAddr[0] + ':' + service.port[0]._)
}

function eurekaMiddleware (params) {
  params = params || {}

  function middleware (options, resilient) {
    options.set('path', params.path || '/eureka/apps')
    options.set('gzip', true)

    return {
      'in': function (err, res, next) {
        if (err) return next()
        xml2js.parseString(res.body, (err, result) => {
          if (err) return next()

          try {
            res.data = mapServersFromEurekaResponse(result, params)
          } catch (err) {
            // fails silently
          } finally {
            next()
          }
        })
      },
      'out': function (options, next) {
        next()
      }
    }
  }

  middleware.type = 'discovery'

  return middleware
}

eurekaMiddleware.mapServersFromEurekaResponse = mapServersFromEurekaResponse

module.exports = eurekaMiddleware
