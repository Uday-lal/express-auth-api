const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
let Users = require("./model");

Users = new Users();
const corsOptions = {
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
	secret: "secret_key",
	resave: false,
	saveUnintialized: false
}));



app.post("/register", (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	if (username && email && password) {
		Users.create({username: username, email: email, password: password});
		res.send({message: "Users is created"});
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
  				res.status(200).send(
  					{
  						message: "You'll are login",
  						user_data: user_data
  					}
  				);
  				req.session.username = user_data.username;
  				req.session.email = user_data.email;
  				req.session.user_id = user_data.id;
  				req.session.save();
  			} else {
  				res.send({message: "Password is incorrect"});
  			}
  		});
  } else {
  	res.send({message: "We don't have enough information to login a user"});
  }
});

app.put("/change_password", (req, res) => {
	let user_id = req.session.user_id;
	if (user_id) {
	  let updated_password = req.body.updated_password;
	  Users.update(user_id, {password: updated_password});
	} else {
		res.send({message: "You're not loged in"});
	}
});

app.listen(8080, () => console.log("Server listening on port 8080..."));
