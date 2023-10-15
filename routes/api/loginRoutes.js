const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();

const { getDbConnection } = require("../../db");

export const loginRoutes = {
  path: "/api/loging",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("petreunite_db");

    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash, info } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }
          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
// Login Route
// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.sendStatus(404); // User not found
//     }

//     // Compare the hashed password
//     const passwordMatch = await bcrypt.compare(password, user.passwordHash);

//     if (!passwordMatch) {
//       return res.sendStatus(401); // Unauthorized (password incorrect)
//     }

//     // Create a JWT token
//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//         info: {
//           userFirstName: user.userFirstName,
//           userLastName: user.userLastName,
//         },
//         isVerified: user.isVerified,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "2d",
//       }
//     );

//     res.status(200).json({ token });
//   } catch (err) {
//     console.error("Error in login:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
