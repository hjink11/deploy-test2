const Visitor = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "visitor", //  모델이름 (첫번째 인자)
    {
      id: {
        //id int not null primary key auto_increment
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        //name varchar(10) not null
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        // comment mediumtext
        type: DataTypes.TEXT("medium"),
      },
    }, //컬럼정의(두번째 인자)
    {
      timestamps: false,
      // 데이터 추가/ 수정 칼럼을 자동으로 만들어서 기록 기본값 ture
      freezeTableName: true,
      //기본값 false
      //첫번째 인자로 전달을 해준 모델 이름 그대로 테이블 이름을 고정하겠다. (visitor로)
    }
  );
  return model;
};

module.exports = Visitor;
