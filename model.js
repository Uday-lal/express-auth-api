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
    let data;
    if (identifier) {
      this.users
        .where(identifier.key, "==", identifier.value)
        .get()
        .then((snapshot) => {
          data = snapshot.docs[0].data();
          data.id = snapshot.docs[0].id;
        });
    } else {
      data = [];
      this.users.get().then((snapshot) => {
        snapshot.docs.forEach((users) => {
          data.push(users.data());
        });
      });
    }
    return data;
  }

  update(user_id, updating_data) {
    this.users.doc(user_id).get().then((docs) => {
      docs.update(updating_data);
    });
  }

  delete(user_id) {
    this.users.doc(user_id).get().then((docs) => {
      docs.delete();
    });
  }
}


export default Users;
