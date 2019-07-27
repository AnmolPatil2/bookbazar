const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
//});
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs


const admin = require('firebase-admin');
admin.initializeApp();

const SENDGRID_API_KEY = functions.config().sendgrid.key;


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
exports.firebaseEmail = functions.firestore.document('users/{userId}/followers/{followerId}').onCreate((event) => {
    console.log(SENDGRID_API_KEY);
    console.log('hello');
    //const userId = event.params.userId;

    //const newValue = snap.data();
    //const db = admin.firestore();
    // return db.collection('users').doc(userId).get().then(doc => {
    //const user = doc.data();
    const msg = {
        to: 'anmolakaterminatorgo@gmail.com',
        from: 'anmol.patil004@gmail.com',
        //templateId: 'd-5bddec37b68f4d4182230cd387d7e0ed',

    };
    console.log(msg)
    return sgMail.send(msg)



    // })
    // .then(() => console.log('Email sent'))
    // .catch(err => console.log(err))
})




