const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in my database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Incorrect password" });
    }

    // Create a JWT token
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
      { expiresIn: "2d" } // Token expiration time
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Internal Server Error..." });
  }
});

module.exports = router;
