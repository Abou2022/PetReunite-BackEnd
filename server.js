const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const furryRoutes = require("./routes/api/furryRoutes");
const userRoutes = require("./routes/api/userRoutes");
const signUpRoute = require("./routes/api/signUpRoute");
const loginRoutes = require("./routes/api/loginRoutes");
// app.use(routes);

app.use(cors());
app.use(express.json()); //new
app.use(cookieParser()); //new
app.use("/api/furry", furryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/signup", signUpRoute);
app.use("/api/login", loginRoutes);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
