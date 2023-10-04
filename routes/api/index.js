const router = require("express").Router();

const furryRoutes = require("./furryRoutes");
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/furry", furryRoutes);
router.use("/user", userRoutes);
router.use("/login", loginRoutes);

module.exports = router;
