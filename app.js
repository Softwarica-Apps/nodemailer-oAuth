require('dotenv').config();
const { sendMail } = require("./mail");

//execute the function
try {
    sendMail("web.softwarica@gmail.com");
} catch (error) {
    console.error(error)
} g