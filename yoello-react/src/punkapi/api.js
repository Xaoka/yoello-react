const https = require('https')
const options = {
  hostname: 'api.punkapi.com',
  port: 443,
  path: '/v2/beers?page=1&per_page=9',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    console.log(`${d}`);
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()