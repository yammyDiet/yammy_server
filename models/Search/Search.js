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
        searchDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        searchTime: {
          type: Sequelize.TIME,
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
  static associate(db) {
    db.Search.belongsTo(db.User, {
      foreignKey: "fk_user_search",
      targetKey: "userId",
    });
  }
};

/* CREATE TABLE Search (
    Searchid int NOT NULL,
    FoodName varchar(100) NOT NULL,
    SearchDate date NOT NULL,
    SearchTime time NOT NULL,
    UserId varchar(100) DEFAULT NULL,
    PRIMARY KEY (Searchid),
    KEY Fk_Search_User_idx (UserId),
    CONSTRAINT Fk_Search_User FOREIGN KEY (UserId) REFERENCES USER (Userid) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; */