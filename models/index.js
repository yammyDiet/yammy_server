const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./User/User");
const ApiData = require("./Api/ApiData");
const Search = require("./Search/Search")

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Search = Search;
db.ApiData = ApiData;

User.init(sequelize);
Search.init(sequelize);
ApiData.init(sequelize);

User.associate(db);
Search.associate(db);

module.exports = db;
