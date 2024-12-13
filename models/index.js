"use strict";

const Sequelize = require("sequelize");

let config = require(__dirname + "/../config/config.js");
//console.log(config);
const env = process.env.NODE_ENV || "development";
//development(개발), production(배포), undefined
console.log("env", env); //
console.log("NODE_ENV", process.env.NODE_ENV); //
config = config[env]; // "development"
console.log("config", config);
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//설정정보를 squ라는 키 안에 넣어주는 중
db.sequelize = sequelize;
// {
//   sequelize:sequelize
// }

//시퀄라이즈 모듈을 Sequelize이라는 키안에 넣어주는 중
db.Sequelize = Sequelize;
// {
//   sequelize:sequelize,
//   Sequelize:sequelize
// }

db.Visitor = require("./Visitor")(sequelize, Sequelize);
// {
//   sequelize:sequelize,
//    Sequelize:sequelize,
//    Visitor: visitor의 모델 추가
// }

module.exports = db; //app.js
