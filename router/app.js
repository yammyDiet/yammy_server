const express = require("express");
const mysql = require("mysql2");
const { sequelize } = require("../models");

const app = express();

app.set("port", 80);

let connection = mysql.createConnection({
  host: "192.168.0.173",
  port: 3305,
  user: "root",
  password: "1234",
  database: "yammy",
});
//데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
const User = require("../models/User/User");
app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Server connection ✅
    http://localhost`);
});
