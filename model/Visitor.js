const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "sesac",
  password: "1234",
  database: "sesac",
});

// 1.  전체목록 조회
//exports.getVisitors = (cb = () => {})
//exports.getVisitors = (cb)
exports.getVisitors = (cb) => {
  //db 연결전
  // return [
  //   { id: 1, name: "홍길동", comment: "내가왔다." },
  //   { id: 2, name: "이찬혁", comment: "으라차차" },
  // ];

  //db연결 후
  conn.query(`SELECT * FROM visitor`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitor 테이블의 전체 조회", rows);
    // 배열의 형태로 들어옴
    //isitor 테이블의 전체 조회 [
    //   RowDataPacket { id: 1, name: '홍길동', comment: '내가 왔다' },
    //   RowDataPacket { id: 2, name: '이찬혁', comment: '야호~~!' }

    //컨트롤러의 (result)=>{} 임
    cb(rows);
  });
};

//2. 특정 데이터 조회 (아이디 기준으로(조건)))
exports.getVisitor = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitior 데이터 한개 조회", rows);
    cb(rows[0]);
  });
};

// 3. 데이터 등록
// visitor 테이블에 데이터 삽입
exports.postVisitor = (data, cb) => {
  // data= req.body,comment와 name 정보가 있는 객체 형태
  conn.query(
    // 문자열은 따옴표안에 둘러싸야 함${}
    `INSERT INTO visitor VALUES(null, "${data.name}", "${data.comment}")`,
    (err, rows) => {
      if (err) throw err;
      console.log("model post", rows);
      /* 
  OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 5, // 현재 넣어진 id
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
        }
      */
      cb(rows.insertId);
    }
  );
};

// 4. 데이터 삭제
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id=${id} `, (err, rows) => {
    if (err) throw err;
    console.log("모델 Visitor.js 특정 데이터 삭제", rows);
    /* 
    OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
    }
    */
    cb();
  });
};

//데이터 수정
exports.patchVisitor = (data, cb) => {
  console.log("model data", data);
  // {id, name, comment}
  conn.query(
    `UPDATE visitor 
    SET name="${data.name}", comment="${data.comment}" 
    WHERE id=${data.id}`,
    (err, rows) => {
      if (err) throw err;
      console.log("Visitor.js 수정", rows);
      /* 
      OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1  Changed: 0  Warnings: 0',
      protocol41: true,
      changedRows: 0
        }
      */
      cb();
    }
  );
};
