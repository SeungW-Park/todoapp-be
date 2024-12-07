const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = 5500;

app.use(cors());

// var whitelist = ["http://example1.com", "http://example2.com"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/api", indexRouter);

require('dotenv').config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;


const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 2. 로그인
// 이메일, 패스워드를 입력해서 보냄
// 데이터베이스에서 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없다면 로그인 실패
// 있다면? 유저정보 + 토큰
// 프론트엔드에서는 이 정보를 저장

// 1. 라우터 설정
// 2. 이메일 패스워드 정보 읽어오기
// 3. 이메일을 가지고 유저정보 가져오기
// 4. 이 유저에 데이터베이스에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
// 5. 맞다! 토근 발행
// 6. 틀리면 에러메시지 보냄
// 7. 응답으로 유저정보 + 토큰 보냄