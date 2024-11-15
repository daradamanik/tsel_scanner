const admin = require('firebase-admin');
const path = require('path');

try {
    console.log('Current directory:', __dirname);
    const serviceAccount = require('./telkomsel-scanner-firebase-adminsdk-cbd2y-b0317ad919.json');
    console.log('Project ID:', serviceAccount.project_id);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
      storageBucket: `${serviceAccount.project_id}.appspot.com`
  });
  console.log('Firebase Admin initialized successfully');
    
  // Get Firestore instance
  const db = admin.firestore();
  module.exports = {admin, db};
} catch (error) {
  console.error('Firebase Error:', error);
  process.exit(1);
}