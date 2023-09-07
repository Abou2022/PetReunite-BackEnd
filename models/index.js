const User = require("./User");
const Furry = require("./Furry");

Furry.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Furry,
};
