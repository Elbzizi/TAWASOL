const express = require("express");
const app = express();
const db = require("./config/db");
const auth = require("./Routes/auth");
const user = require("./Routes/user");
const poste = require("./Routes/poste");
const profile = require("./Routes/profile");

db();

app.get("/", (req, res) => {
  res.send("<h1>hello world im server</h1>");
});
app.use("api/auth", auth);
app.use("api/user", user);
app.use("api/poste", poste);
app.use("api/profile", profile);
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`start server a port ${port}`);
});
