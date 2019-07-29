const functions = require("firebase-functions")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const lipisha = require("lipisha")
const secrets = require("./secrets")

const client = new lipisha.Lipisha(secrets.LIPISHA_API_KEY, secrets.LIPISHA_API_SIGNATURE)


function request_cash(phone, amount){
    client.request_settlement(phone, amount, (errror, response)=>{
        console.log(errror)
        console.log(response)
    })
}

