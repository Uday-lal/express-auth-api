const express = require("express");
const app = express();
let Users = require("./model");

Users = new Users();

app.use(express.urlencoded());
app.use(express.json());


app.post("/register", (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	if (username && email && password) {
		Users.create({username: username, email: email, password: password});
		res.send({message: "Users is creates"});
	} else {
		res.send({message: "We don't have enough information to create a user"});
	}
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
  	Users.users
  		.where("email", "==", email)
  		.get()
  		.then((snapshot) => {
  			let user_data = snapshot.docs[0].data();
  			if (user_data.password == password) {
  				user_data.id = snapshot.docs[0].id;
  				res.send(
  					{
  						message: "You'll able to login",
  						user_data: user_data
  					}
  				);
  			} else {
  				res.send({message: "Password is incorrect"});
  			}
  		});
  } else {
  	res.send({message: "We don't have enough information to login a user"});
  }
});

app.put("/change_password", (req, res) => {
  let user_id = req.body.user_id;
  let updated_password = req.body.updated_password;
  Users.update(user_id, {password: updated_password});
  res.send({message: "Update successfull"})
});

app.listen(8080, () => console.log("Server listening on port 8080..."));
