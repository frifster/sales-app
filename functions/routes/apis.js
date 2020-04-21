const express = require('express')
const router = express.Router()

const getGoogleAuth = require('../auth/getGoogleAuth')
const processInvoice = require('../helpers/processInvoice')

router.get('/invoice', async (req, res, next) => {
  const auth = await getGoogleAuth()
  const data = await processInvoice(auth)
  res.json(data)
})

module.exports = router
