/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');

admin.initializeApp();


function sendMessage(){
    admin.firestore().collection('FCMTokens').get().then(
        querySnapshot => {
            querySnapshot.docs.map( doc => {
                console.log('Token recuperado: ', doc.data().token);
                tokens.push(doc.data().token);
                const payload= {
                    token: doc.data().token,
                    notification: {
                        title: 'change',
                        body: 'update'
                    },
                    data: {
                        body: 'update'
                    }
                }
                admin.messaging().send(payload).then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                    return {success: true};
                }).catch((error) => {
                    console.log('Error on send message')
                    return {error: error.code};
                });
            })
        }
    )

}


//funciona
exports.createDocument = functions.firestore.document('/actores/{documentId}')
    .onCreate(() => {
        sendMessage();
});

//funciona
exports.updateDocument = functions.firestore.document('/actores/{documentId}')
    .onUpdate(() => {
        sendMessage()
});

//funciona
exports.deleteDocument = functions.firestore.document('/actores/{documentId}')
    .onDelete(() => {
        sendMessage()
});


  