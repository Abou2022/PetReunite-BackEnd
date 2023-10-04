import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../config/connection"; // Import your MySQL connection

export const loginRoutes = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (rows.length === 0) {
        return res.sendStatus(404); // User not found
      }

      const user = rows[0];

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        return res.sendStatus(401); // Unauthorized (password incorrect)
      }

      // Create a JWT token
      jwt.sign(
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
        {
          expiresIn: "2d",
        },
        (err, token) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default loginRoutes;
