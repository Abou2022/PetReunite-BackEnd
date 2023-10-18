const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();

// Login Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400); // Bad request: Missing email or password
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(404); // User not found
    }

    // Compare the hashed password
    if (user.passwordHash && typeof user.passwordHash === "string") {
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

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
        res.sendStatus(401); // Unauthorized (password incorrect)
      }
    } else {
      res.sendStatus(500); // Internal Server Error: Password hash missing or invalid
    }
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
