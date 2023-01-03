const express = require("express");
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
} = require("../../controller/user/userController");
const router = express.Router();

const path = require("path");
router.get("/", (req, res) => {
  //res.send("hh");
  res.sendFile(path.join(__dirname, "../../public/home.html"));
});

router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/login", getLogin);
router.post("/login", postLogin);

module.exports = router;
