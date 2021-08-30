const express = require("express");
const app = express();

app.post("/register", (req, res) => {
  // ...
});

app.post("/login", (req, res) => {
  // ...
});

app.put("/change_password", (req, res) => {
  // ...
});

app.listen(8080, () => console.log("Server listening on port 8080..."));
