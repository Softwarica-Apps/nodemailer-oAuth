require('dotenv').config()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

// oAuthSetup with CLIENT_ID and CLIENT_SECRET
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
)

// set refresh token in here
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
})

// get new access token because it expires after certain interval
const accessToken = oauth2Client.getAccessToken()

// describes how we want to send an email, the user here will be your user added in your project at google developer console.
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'apps.softwarica@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken,
    tls: {
      rejectUnauthorized: false,
    },
  },
})

//send mail function make it asynchrounous for non-blocking code
// email content
// seperate with comma in order to send it to multiple users, currently working with outlook and gmail services.

const sendMail = async data => {
  const mailOptions = {
    from: '"Campus 4.0"<apps.softwarica@gmail.com>',
    to: data.clientAddress,
    subject: 'Password Reset',
    generateTextFromHTML: true,
    html:
      `Hi ${data.username},<br>` +
      'Please click on the button below to reset your password.<br>' +
      'The link is valid for an hour and after that, a new reset link needs to be requested.<br>' +
      'If you did not request this, please ignore this email and your password will remain unchanged.<br>' +
      `<br><a href="${data.link}"><button style='background-color: #4CAF50;border-radius: 8px;color:white;font-size:14px;padding:12px 16px;'>Click here</button></a>`,

      
  }


  // sending an email in here.
 const resuuu= await smtpTransport.sendMail(mailOptions)
return resuuu
}

process.on("message", async (params) => {
  console.log("here")
  console.log(params)
  let result = await sendMail(params)
  // const result = await smtpTransport.sendMail(mailOptions)
  console.log(result)
  process.send(result);
});

