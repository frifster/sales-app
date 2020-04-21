const { google } = require('googleapis')

function processInvoice (auth) {
  return new Promise((resolve, reject) => {
    console.log('CALLING CREATE INVOICE')
    const sheets = google.sheets({ version: 'v4', auth })
    sheets.spreadsheets.values.get({
      spreadsheetId: '14DhGQP41H3AzfY7GhD5jxZytP8xkbnGygzap_KhVuII',
      range: 'Order Sheet!A2:Q'
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)
      const rows = res.data.values

      const data = {}
      if (!rows.length) resolve({})

      rows.forEach((row, index) => {
        const orderId = row[14]
        if (orderId && orderId !== 'NAH' && row[3]) {
          data[orderId] = data[orderId] || { orders: [] }

          const dataTofill = data[orderId]

          dataTofill.dateOrdered = dataTofill.dateOrdered || row[0]
          dataTofill.facebookName = dataTofill.facebookName || row[1]
          dataTofill.contactPerson = dataTofill.contactPerson || row[2]
          dataTofill.contactNumber = dataTofill.contactNumber || row[3]
          dataTofill.address = dataTofill.address || row[4]
          dataTofill.paymentMethod = dataTofill.paymentMethod || row[5]
          dataTofill.paymentSent = dataTofill.paymentSent || row[10]
          dataTofill.courier = dataTofill.courier || row[11]
          dataTofill.trackingNumber = dataTofill.trackingNumber || row[12]
          dataTofill.status = dataTofill.status || row[13]
          dataTofill.orderId = dataTofill.orderId || row[14]
          dataTofill.trackURL = dataTofill.trackURL || row[15]

          // Fill up orders
          dataTofill.orders = [
            ...dataTofill.orders,
            {
              quantity: row[6],
              item: row[7],
              unitCost: row[8],
              amount: row[9]
            }
          ]
        }
      })

      resolve(data)
    })
  })
}

module.exports = processInvoice
