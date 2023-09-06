const sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env) {
  sequelize = new sequelize.Sequelize();
}
