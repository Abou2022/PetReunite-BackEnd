const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Furry extends Model {}

Furry.init(
  {
    // add properites here, ex:
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    furryDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    animal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    particularSign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastDay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petLost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    petFound: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    // timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: "furry",
  }
);

module.exports = Furry;
