const express = require('express')
const axios = require('axios')

const API_KEY = process.env.API_KEY

const app = express()

axios.defaults.baseURL = 'https://api.onomondo.com'
axios.defaults.headers.common['authorization'] = API_KEY

app.post('/', express.json(), async (req, res) => {
  const {
    timestamp,
    sim_id: simId,
    payload,
    header
  } = req.body
  const {
    protocol,
    destination_ip: destinationIp,
    destination_port: destinationPort,
    device_ip: deviceIp,
    device_port: devicePort
  } = header
  console.log(`${timestamp} - ${simId} - ${protocol} - ${destinationIp}:${destinationPort} - ${deviceIp}:${devicePort}`)

  if (protocol !== 'udp') return res.end()

  await axios.post(`/messages/${simId}`, {
    protocol: 'udp',
    port: devicePort,
    data: Buffer.from(payload).toString('base64') // Echo back as a base64 encoded string
  })

  res.end()
})

app.listen(process.env.PORT || 3030)
