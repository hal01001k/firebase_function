const functions = require("firebase-functions");
const axios  =  require('axios')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest((req,res)=>{
    res.send("hello from firebase funtion!")
});

// exports.api = functions.https.onRequest( async (req,res)=>{
//     switch(req.method){
//         case 'GET':
//             const response =  await axios.get('https//jsonplaceholder.typicode.com/users/1');
//             res.send(response.data);
//             break;
//         case 'POST':
//             const body = req.body;
//             res.send(body);
//             break;
//         case 'DELETE':
//             res.send('it was DELETE requests');
//             break;
//         default:
//             res.send('It was a default request...')    
//     }
// });
exports.userAdded = functions.auth.user().onCreate(user => {
    console.log(`${user.email} is created..`)
    return Promise.resolve()
});
exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log(`${user.email} is Deleted..`)
    return Promise.resolve()
});

exports.fruitAdded = functions.firestore.document('/fruits/{documentId}').onCreate((snapshot,context)=>{
    console.log(snapshot.data())
    return Promise.resolve()
})

exports.fruitDeleted = functions.firestore.document('/fruits/{documentId}').onDelete((snapshot,context)=>{
    console.log(snapshot.data(),'Deleted')
    return Promise.resolve()
})

exports.fruitUpdated = functions.firestore.document('/fruits/{documentId}').onUpdate((snapshot,context)=>{
    console.log('Before',snapshot.before.data())
    console.log('After',snapshot.after.data())
    return Promise.resolve()
})

exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun(context => {
console.log("I am running this every minute...")
return null;
})
