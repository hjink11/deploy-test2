const { where } = require("sequelize");
const models = require("../models/index"); //모델스의 index
const { errorlogs } = require("../utils/common");
//const Visitor = require("../model/Visitor");  //원래 모델
//console.log(Visitor.getVisitors());

/*
GET 
*/

exports.main = (req, res) => {
  res.render("index");
};

//visitors GET
exports.getVisitors = (req, res) => {
  //db 연결전 아래
  //res.render("visitors", { data: Visitor.getVisitors() });

  //db 연결 후 result느 model의 rows
  //시퀄전임ㅂ!!!!!!!
  // Visitor.getVisitors((result) => {
  //   console.log("전체목록 Cvisitor.js", result);
  //   res.render("visitors", { data: result });
  // });

  //!!!!!sequelize 이후!!!!!!!
  //`SELECT * FROM visitor`
  models.Visitor.findAll()
    .then((result) => {
      console.log("findAll>>", result);
      //findAll의 결과는 배열
      //res.send(result);
      res.render("visitors", { data: result });
    })
    .catch((err) => {
      console.log("getVisitors Cotroller Err", err);
      res.status(500).send("sever err!");
    });
};

/* /visitor  GET (특정 하나니까 visitor임 s아니고)*/
/* /visitor/:id GET*/
exports.getVisitor = async (req, res) => {
  console.log(req.params); // {id:'1'}
  console.log(req.params.id); // '2'

  //!!!!!!!!!!시퀄 이전
  // Visitor.getVisitor(req.params.id, (result) => {
  //   console.log("한 개의 데이터 Cvisitor.js", result);
  //   res.send(result);
  // });

  //!!!!!!!시퀄라이즈 이후
  //`SELECT * FROM visitor WHERE id=${req.params.id}`  특정 데이터 조회
  try {
    const result = await models.Visitor.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("findOne >> ", result);
    res.send(result);
    // findOne >>  visitor {
    //   dataValues: { id: 2, name: '이찬혁', comment: '야호~~!' },
    //   _previousDataValues: { id: 2, name: '이찬혁', comment: '야호~~!' },
    //   uniqno: 1,
    //   _changed: Set(0) {},
    //   _options: {
    //     isNewRecord: false,
    //     _schema: null,
    //     _schemaDelimiter: '',
    //     raw: true,
    //     attributes: [ 'id', 'name', 'comment' ]
    //   },
    //   isNewRecord: false
    // }
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Sever ");
  }
};

/* /visitor POST, 등록*/
// INSERT INTO >> create()
exports.postVisitor = (req, res) => {
  console.log("req.body", req.body);

  // [sequelize 이전]
  // Visitor.postVisitor(req.body, (result) => {
  //   console.log("Cvisitor.js", result);
  //   res.send({
  //     id: result,
  //     comment: req.body.comment,
  //     name: req.body.name,
  //   });
  // });

  // [sequelize 이후]
  // `INSERT INTO visitor VALUE(null, "${data.name}", "${data.comment}")`
  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      /* 
      visitor {
  dataValues: { id: 4, name: 'allie', comment: '짱!!!' },
  _previousDataValues: { name: 'allie', comment: '짱!!!', id: 4 },
  uniqno: 1,
  _changed: Set(0) {},
  _options: {
    isNewRecord: true,
    _schema: null,
    _schemaDelimiter: '',
    attributes: undefined,
    include: undefined,
    raw: undefined,
    silent: undefined
  },
  isNewRecord: false
}
      */
      res.send(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("server err");
    });
};

/* /visitor DELETE, 삭제 */
// delete from ~~ >> destroy()
exports.deleteVisitor = async (req, res) => {
  console.log(req.body); // { id: '3' }
  console.log(req.body.id); // '3'
  // [sequelize 이전]
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 id 삭제완료");
  // });

  // [sequelize 이후]
  // `DELETE FROM visitor WHERE id=${req.body.id}`
  try {
    const result = await models.Visitor.destroy({
      where: { id: req.body.id },
    });
    console.log(result);
    // 1(삭제 성공), 0(삭제 실패-없는 데이터를 삭제하려고 할 때)
    // true   , false
    if (Boolean(result)) {
      // Number to Boolean
      res.send(req.body.id + "번 id 삭제완료");
    } else {
      res.send("잘못된 접근입니다!!");
    }
  } catch (err) {
    console.log("err", err);
    res.send("internal server error!");
  }
};

/* /visitor PATCH, 수정 */
//update SET >> update
exports.patchVisitor = async (req, res) => {
  console.log(req.body);
  //시퀄라이즈 전
  // Visitor.patchVisitor(req.body, () => {
  //   res.send("수정 완료");
  // });
  // // res.send("response patch!");

  //시퀄라이즈 후!!!!!!
  //`UPDATE visitor
  // SET name="${data.name}", comment="${data.comment}"
  // WHERE id=${data.id}`
  try {
    const [result] = await models.Visitor.update(
      {
        name: req.body.name,
        commnet: req.body.comment,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    console.log(result); // [1], [0]
    // const [nember] = result
    // console.log(number)

    if (Boolean(result)) {
      res.send("수정완료");
    } else {
      res.send("잘못된 접근입니다. ");
    }
  } catch (err) {
    errorlogs(err, "patch controller 내부"); // 에러 common
  }
};
