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
const postLogin = async (req, res) => {
    // es6 문법으로 변수명 지정하면서 바로 가져올 수 있음
    const {id, password} = req.body; // form에서 user의 로그인 정보 가져오기
        if(id.length == 0 && password.length == 0){
            res.redirect("/login?" + "아이디나 비밀번호는 필수 입력란입니다.");
        }
    const user = await User.findByPk(id);
    console.log(user);
    if(user===null){
        // DB에서 유저 정보가 없을 경우
        res.status(400).redirect("/login"+"아이디 나 비밀번호가 틀렸습니다");
    }else{
        // 유저 정보가 있을 경우
        //비밀번호 확인
        const hashPassword = bcrypt.hashSync(password,5);
        if(!bcrypt.compareSync(hashPassword, user.dataValues.password)){
            res.status(400).redirect("/login?"+"아이디 나 비밀번호가 틀렸습니다");
        }
        res.status(200).json({result:"success"});
    }
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
};
