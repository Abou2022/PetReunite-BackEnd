const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // hooks: {
    //   beforeCreate: async (userData) => {
    //     userData.password = await bcrypt.hash(userData.password, 5);
    //     return userData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;
