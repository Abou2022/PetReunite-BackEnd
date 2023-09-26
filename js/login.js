const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Define the login route
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if a user with the provided email and password exists in your database
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: "Login failed" });
    }

    // Successful login, you can send user data as a response if needed
    res.json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
