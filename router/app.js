const express = require("express");
const mysql = require("mysql2");
const { sequelize } = require("../models");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("../models/User/User");
const fs = require("fs");
// 라우터
const homeRouter = require("./home/homeRouter");

const app = express();

app.set("port", 80);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 경로 설정
app.use("/", express.static("public"));

//데이터베이스 연결
//차후 db.js로 빼기
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use("/", homeRouter);

// 에러 미들웨어(페이지 없음)
app.use((req,res,next)=>{
  res.status(404).json({result:"Error", message:"없는 페이지입니다"})
  next(createError(404));
})

// 에러 미들웨어(예외적 오류)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({result:"Error", message:"Server Error!!!"})
});

// 앱 실행
app.listen(app.get("port"), () => {
  console.log(`Server connection ✅
    http://127.0.0.1`);
});
