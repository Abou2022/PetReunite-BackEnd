// routes/login.js

const express = require("express");
const router = express.Router();
const { User } = require("../../models"); // Import your User model

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look for a user with the provided email in your database
    const user = await User.findOne({ where: { email } });

    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the provided password matches the stored password
    const passwordMatch = await user.checkPassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If both email and password are correct, create a user session or token
    // You can use libraries like Passport.js or JWT for this

    // Return a success message or user data
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
