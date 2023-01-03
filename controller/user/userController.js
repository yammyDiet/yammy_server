const bcrypt = require("bcrypt");
const path = require("path");
const { User } = require("../../models");

const getRegister = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../../public/register.html"));
};
const postRegister = async (req, res) => {
  const { id, email, image, password, name, gender, age } = req.body;
  const duplicateUser = await User.findByPk(id);
  if (duplicateUser) {
    res.redirect("/register?" + "duplicate User");
  }
  const hashPassword = bcrypt.hashSync(password, 5);
  console.log(password, hashPassword);
  const user = await User.create({
    userId: id,
    email,
    image,
    password: hashPassword,
    name,
    gender,
    age,
    kakaoLogin: false,
  });
  res.json(user);
};

const getLogin = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../../public/login.html"));
};
const postLogin = (req, res) => {};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
};
