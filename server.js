const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const furryRoutes = require("./routes/api/furryRoutes");
const userRoutes = require("./routes/api/userRoutes");
// app.use(routes);

app.use(cors());
app.use(express.json());
app.use("/api/furry", furryRoutes);
app.use("/api/user", userRoutes);

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
