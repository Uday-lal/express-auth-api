var admin = require("firebase-admin");

var serviceAccount = require("FirebaseServiceAccountCred.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
