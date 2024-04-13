const express = require("express");
const app = express();
const db = require("./config/db");

db();

app.get("/", (req, res) => {
  res.send("<h1>hello world im server</h1>");
});
app.use("api/auth", require("./Routes/auth"));
app.use("api/user", require("./Routes/user"));
app.use("api/poste", require("./Routes/poste"));
app.use("api/profile", require("./Routes/profile"));
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`start server a port ${port}`);
});
