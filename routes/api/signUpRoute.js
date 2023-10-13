const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();

// SignUp Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.sendStatus(409); // User already exists
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      email,
      passwordHash,
      userFirstName: "",
      userLastName: "",
      isVerified: false,
    });

    // Create a JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email,
        info: { userFirstName: "", userLastName: "" },
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({ token });
    // Test my program
    console.log(res);
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
