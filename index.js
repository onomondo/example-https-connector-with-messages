const express = require('express')
const axios = require('axios')

const API_KEY = process.env.API_KEY

const app = express()

axios.defaults.baseURL = 'https://api.onomondo.com'
axios.defaults.headers.common['authorization'] = API_KEY

app.post('/', express.json(), async (req, res) => {
  console.log(req.body)
  const { data } = await axios.post('/messages/000001935', {
    protocol: 'udp',
    port: 1234,
    text: 'hello world'
  })
  console.log(data)
  res.end()
})

app.listen(process.env.PORT || 3030)

