const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use((req, res) => {
  res.send("<h1> Wrong route, you need to update your Route!</h1>");
});
// const userRoutes = require("./api/userRoutes");
// router.use("/api/users", userRoutes);

// const furryRoutes = require("./api/furryRoutes");
// router.use("/api/furry", furryRoutes);

// router.get("/sessions", (req, res) => {
//   res.json(req.session);
// });

module.exports = router;
