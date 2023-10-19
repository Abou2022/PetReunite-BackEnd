const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();

// Login Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email) {
      return res.status(400).json({ error: "Email is missing" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is missing" });
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Create a JWT token and send a response
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
