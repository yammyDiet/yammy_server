const express = require("express");
const dotenv = require('dotenv'); 
dotenv.config();
const session = require("express-session");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
// 라우터
const homeRouter = require("./home/homeRouter");
const dietRouter = require("./diet/dietRouter");
const { sequelize } = require("../models");

const app = express();

app.set("port", 80);
//로그 출력을 위한 파일 과 경로를 위한 모듈 설정
const fs = require('fs');
const path = require('path');
//static 파일의 경로 설정 
app.use(express.static(path.join(__dirname, 'public')));
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const logDirectory = path.join(__dirname, 'public/log');
// 로그 디렉토리 생성
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// 로그 파일 옵션 설정
const accessLogStream = FileStreamRotator.getStream({
date_format: 'YYYYMMDD',
filename: path.join(logDirectory, 'access-%DATE%.log'), frequency: 'daily',
verbose: false
});
// 로그 설정
app.use(morgan('combined', {stream: accessLogStream}));
//출력하는 파일 압축해서 전송
const compression = require('compression'); app.use(compression());

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//쿠키 설정
const cookieParser = require('cookie-parser'); 
app.use(cookieParser(process. env.COOKIE_SECRET));
//세션 설정
var options = {
  host :process.env.HOST,
  port : process.env.MYSQLPORT, user : process.env.USERID, password : process.env.PASSWORD, database : process.env.DATABASE
  };
const MySQLStore = require('express-mysql-session')(session);
app.use(session({
  httpOnly: true,	//자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
  secure: true,	//https 환경에서만 session 정보를 주고받도록처리
  secret: process.env.COOKIE_SECRET, 	//암호화하는 데 쓰일 키
  resave: false,	//세션을 언제나 저장할지 설정함
  saveUninitialized: true,	//세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true,
    Secure: true
  },
  store : new MySQLStore(options)
}))


app.use(cors());

//데이터베이스 연결
sequelize
.sync({ force: false })
.then((data) => {
  console.log(data)
  console.log("데이터베이스 연결 성공");
})
.catch((err) => {
  console.error(err.message);
});

app.use("/", homeRouter);
app.use("/diet", dietRouter);

// 에러 미들웨어(페이지 없음)
app.use((req,res,next)=>{
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`); 
  err.status = 404;
  next(err);
})

// 에러 미들웨어(예외적 오류)
app.use((err, req, res, next) => {
res.locals.message = err.message;
res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
res.status(err.status || 500);
  res.json({result:"Error", message:res.locals.error})
});

// 앱 실행
app.listen(app.get("port"), () => {
  console.log(`Server connection ✅
    http://localhost`);
});
