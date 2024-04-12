const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>hello world im server</h1>");
});
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`start server a port ${port}`);
});
