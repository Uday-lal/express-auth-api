const admin = require("firebase-admin");

const serviceAccount = require("./FirebaseServiceAccountCred.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const table = db.collection("users");


class Users {
  constructor() {
    this.users = db.collection("users");
  }

  create(data) {
    this.users.add(data);
  }

  read(identifier) {
    let data = [];
    if (identifier) {
      this.users
        .where(identifier.key, "==", identifier.value)
        .get()
        .then((snapshot) => {
          let user_data = snapshot.docs[0].data();
          user_data.id = snapshot.docs[0].id;
          data.push(user_data);
        });
    } else {
      this.users.get().then((snapshot) => {
        snapshot.docs.forEach((users) => {
          data.push(users.data());
        });
      });
    }
    return data[0];
  }

  update(user_id, updated_data) {
    this.users.doc(user_id).update(updated_data)
  }

  delete(user_id) {
    this.users.doc(user_id).get().then((docs) => {
      docs.delete();
    });
  }
}


module.exports = Users;
