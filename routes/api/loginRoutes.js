const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();

// Login Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is missing" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is missing" });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          info: {
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
          },
          isVerified: user.isVerified,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
