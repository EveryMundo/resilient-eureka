# resilient-eureka
[resilient.js](https://github.com/resilient-http/resilient.js) middleware for [Netflix Eureka](https://github.com/Netflix/eureka) discovery service


## Installation

```
npm install resilient-eureka --save
```

## Usage

```js
const Resilient = require('resilient')
const eurekaMiddleware = require('resilient-eureka')

const client = Resilient()

//eureka urls
const servers = [
  'http://demo.eureka.com'
]

client.use(eurekaMiddleware({
  serviceName: 'service'
}))

client.discoveryServers(servers)

// Test request
client.get('/', function (err, res) {
  if (res.status === 200) {
    console.log('Response:', res)
  }
})
```

## Params

- **serviceName/serviceVipAddress** `string` - name/vipAddress of service registered in Eureka (one of these is required)
- **path** `string` - path to query for all Eureka's services instances (default: `/eureka/apps`)
- **protocol** `string` - transport protocol (default: `http`)