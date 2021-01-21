require('dotenv').config();

const { fork } = require('child_process');

//execute the function
try {
    let data = {
        clientAddress: "web.softwarica@gmail.com",
        username: "160188",
        link: "https://campus.softwarica.edu.np"
    }
    // console.log(data)
    const calculation = fork("mail.js");
    calculation.send(data);
    calculation.on("message", async (response) => {
        // console.log("here")
        let result = await response;
        console.log("Response is :", response);
        console.log("Result is :", result)
    });
} catch (error) {
    console.error(error)
} 