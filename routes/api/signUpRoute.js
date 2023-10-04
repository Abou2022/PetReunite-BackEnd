import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../config/connection"; // Import your MySQL connection

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (rows.length > 0) {
        return res.sendStatus(409); // User already exists
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert user into the database
      const [result] = await db.query(
        "INSERT INTO users (email, passwordHash, userFirstName, userLastName, isVerified) VALUES (?, ?, '', '', false)",
        [email, passwordHash]
      );

      const userId = result.insertId;

      // Create a JWT token
      jwt.sign(
        {
          id: userId,
          email,
          info: { userFirstName: "", userLastName: "" },
          isVerified: false,
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
      console.error("Error in signup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
export default signUpRoute;
