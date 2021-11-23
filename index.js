const express = require('express')

const app = express()

app.post('/', express.json(), (req, res) => {
  console.log(req.body)
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3030)
