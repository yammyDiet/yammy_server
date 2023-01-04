const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    //테이블 설정
    return super.init(
      {
        //컬럼 설정
        userId: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          primaryKey: true,
          validate: {
            len: [5, 30],
            max: 30,
            min: 5,
            // 사용자 설정 검증 추가 가능
          },
        },
        email: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        image: {
          type: Sequelize.STRING(256),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        kakaoLogin: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      },
      {
        //테이블 설정
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "USER",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    //테이블 간의 관계 설정
    //1:N일 경우 hasMany(), belongsTO() 활용
    db.User.hasMany(db.Search, {
      foreignKey: "fk_user_search",
      sourceKey: "userId",
    });
    // db.User.hasMany(db.Diet, {
    //   foreignKey: "fk_user_diet",
    //   sourceKey: "userid",
    // });
    // db.User.hasMany(db.PersonalInbody, {
    //   foreignKey: "fk_user_personalInbody",
    //   sourceKey: "userid",
    // });
  }
};
