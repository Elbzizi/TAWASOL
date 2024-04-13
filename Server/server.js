const express = require("express");
const app = express();
const db = require("./config/db");
const authRoutes = require("./Routes/auth.js");
const userRoutes = require("./Routes/user");
const posteRoutes = require("./Routes/poste");
const profileRoutes = require("./Routes/profile");

db();

app.get("/", (req, res) => {
  res.send("<h1>hello world im server</h1>");
});
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/poste", posteRoutes);
app.use("/api/profile", profileRoutes);
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`start server a port ${port}`);
});
