const Sequelize = require("sequelize");
module.exports = class Search extends Sequelize.Model {
  static init(sequelize) {
    //테이블 설정
    return super.init(
      {
        //컬럼 설정
        searchId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        foodName: {
          type: Sequelize.CHAR(200),
          allowNull: false,
        },
        userId: {
            type: Sequelize.CHAR(200),
            allowNull: false,
          },
      },
      {
        //테이블 설정
        sequelize,
        timestamps: true,
        modelName: "Search",
        tableName: "Search",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db){
    db.Search.belongsTo(db.User,{
        foreignKey:"fk_user_search", targetKey:"userId"
    })
  }
};
