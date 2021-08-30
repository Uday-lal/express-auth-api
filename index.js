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
  // ...
});

app.put("/change_password", (req, res) => {
  // ...
});

app.listen(8080, () => console.log("Server listening on port 8080..."));
