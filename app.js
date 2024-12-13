const express = require("express");
const db = require("./models"); //index 불러오는
const app = express();
require("dotenv").config(); // npm install dotenv 이후 연결
const PORT = process.env.PORT; //.env에 저장한 PORT = 8080로 서버 연결

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

//라우터
const indexRouter = require("./routes"); //index만 파일이름 생략가능
app.use("/", indexRouter);

//404
app.get("*", (req, res) => {
  res.render("404");
});

//sequelize db 연결
db.sequelize.sync({ force: false }).then((result) => {
  //force가 꼭 false로 해야 안지워짐
  //console.log(result);  // 엄청 긴 정보
  console.log("DB연결 성공!");
  console.log("---------");
  //포트 열기 여기로 넣어줌 맨 밑에 나오기 위해서(sync가 비동기적이라서)
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
