const Sequelize = require("sequelize");
module.exports = class ApiData extends Sequelize.Model {
  static init(sequelize) {
    //테이블 설정
    return super.init(
      {
        //컬럼 설정
        foodId: {
          type: Sequelize.STRING(256),
          allowNull: false,
          primaryKey: true,
        },
        foodName: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        foodBigGroup: {
            type: Sequelize.STRING(256),
            allowNull: false,
          },
          foodSmallGroup: {
            type: Sequelize.STRING(256),
            allowNull: false,
          },
          supply:{
            type:Sequelize.TEXT,
            allowNull:false,
          },
          calorie: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          fat: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          carbonhydrate: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          protein: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          natrium: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          sugar:{
            type: Sequelize.TEXT,
            allowNull: false,
          },
          calcium:{
            type: Sequelize.INTEGER,
            allowNull: false,
          }
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
