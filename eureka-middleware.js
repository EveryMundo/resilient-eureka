const xml2js = require('xml2js')

module.exports = function eurekaMiddleware(params) {
  params = params || {}

  function middleware(options, resilient) {
    options.set('path', params.path || '/eureka/apps')
    return {
      'in': function (err, res, next) {
        if (err) return next()
        xml2js.parseString(res.body, (err, result) => {
          if (err) return next()

          try {
            res.data = mapServersFromEurekaResponse(result)
          } catch (err) { 
            //fails silently
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
  
  function mapServersFromEurekaResponse(data) {
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
  
  middleware.type = 'discovery' 
  
  return middleware
}