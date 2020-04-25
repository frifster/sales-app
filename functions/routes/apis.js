const express = require('express')
const router = express.Router()

const processInvoice = require('../helpers/processInvoice')

router.post('/invoice', async (req, res, next) => {
  const {
    body: {
      spreadsheetId
    }
  } = req
  try {
    const data = await processInvoice({ spreadsheetId })
    res.json(data)
  } catch (err) {
    res.status(400).json({ success: false })
  }
})

module.exports = router
