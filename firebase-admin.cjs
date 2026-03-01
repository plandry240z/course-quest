const admin = require("firebase-admin");

// This loads your downloaded JSON key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get Firestore from admin
const db = admin.firestore();

// Export both so server.cjs can use them
module.exports = { admin, db };