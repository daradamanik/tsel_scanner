const admin = require('firebase-admin');

const serviceAccount = require('../.idea/telkomsel-scanner-firebase-adminsdk-cbd2y-6383334371.json'); // Get this file from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // You can access Firestore here
module.exports = db;