const Sequelize = require("sequelize");
module.exports = class ApiData extends Sequelize.Model {
  static init(sequelize) {
    //테이블 설정
    return super.init(
      {
        //컬럼 설정
        foodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        foodName: {
          type: Sequelize.CHAR(200),
          allowNull: false,
        },
        foodGroup: {
            type: Sequelize.CHAR(200),
            allowNull: false,
          },
          calorie: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          fat: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          carbonhydrate: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          protin: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          natrium: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
      },
      {
        //테이블 설정
        sequelize,
        timestamps: true,
        modelName: "ApiData",
        tableName: "ApiData",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
