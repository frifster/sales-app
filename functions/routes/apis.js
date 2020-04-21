const express = require('express')
const router = express.Router()

const processInvoice = require('../helpers/processInvoice')

router.get('/invoice', async (req, res, next) => {
  const data = await processInvoice()
  res.json(data)
})

module.exports = router
