require('dotenv').config();
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2;

// oAuthSetup with CLIENT_ID and CLIENT_SECRET
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

// set refresh token in here
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

// get new access token because it expires after certain interval
const accessToken = oauth2Client.getAccessToken();

// describes how we want to send an email, the user here will be your user added in your project at google developer console.
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "apps.softwarica@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
        tls: {
            rejectUnauthorized: false
        }
    }
});

//send mail function make it asynchrounous for non-blocking code
// email content
// seperate with comma in order to send it to multiple users, currently working with outlook and gmail services.
module.exports = {
    sendMail: (clientAddress) => {
        const mailOptions = {
            from: "apps.softwarica@gmail.com",
            to: clientAddress,
            subject: "This is just a test with google OAuth2 and nodemailer",
            generateTextFromHTML: true,
            html: "<b>Test OAuth2</b>"
        };

        // sending an email in here.
        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error.message) : console.log(response);
            smtpTransport.close();
        });
    }
}