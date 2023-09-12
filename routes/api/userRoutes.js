const express = require("express");
// const router = express.Router();
const { User, Furry } = require("../../models");
// const bcrypt = require("bcrypt");

const router = require("express").Router();

//Get All
// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll();
//     console.log(userData);

//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Find all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({ include: { all: true } });
    console.log("userData:", userData);
    if (!userData || userData.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.json(userData);
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ msg: "An error occurred", error: err.message });
  }
});
//Create a user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update a user
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a User
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this data" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
