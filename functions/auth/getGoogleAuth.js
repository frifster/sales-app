const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const path = require('path')

const SHEETS_URL = 'https://sheets.googleapis.com'
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(__dirname, './config/token.json')
const CRED_PATH = path.join(__dirname, './config/credentials.json')

const getGoogleAuth = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(CRED_PATH, (err, content) => {
      if (err) return console.log('Error loading client secret file:', err)
      // Authorize a client with credentials, then call the Google Sheets API.
      resolve(authorize(JSON.parse(content)))
    })
  })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

async function authorize (credentials) {
  return new Promise((resolve, reject) => {
    const {
      client_secret: clientSecret,
      client_id: clientId,
      redirect_uris: redirectUris
    } = credentials.web
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, 'https://sales-app-dd461.web.app/')
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return resolve(getNewToken(oAuth2Client))
      oAuth2Client.setCredentials(JSON.parse(token))
      resolve(oAuth2Client)
    })
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getNewToken (oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close()
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err)
        oAuth2Client.setCredentials(token)
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err)
          console.log('Token stored to', TOKEN_PATH)
        })
        resolve(oAuth2Client)
      })
    })
  })
}

module.exports = getGoogleAuth
