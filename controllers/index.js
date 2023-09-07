const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

const furryRoutes = require("./furryRoutes");
router.use("/api/pets", furryRoutes);

router.get("/showsessions", (req, res) => {
  res.json(req.session);
});

module.exports = router;
