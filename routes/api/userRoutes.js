const express = require("express");
// const router = express.Router();
const { User, Furry } = require("../../models");
const bcrypt = require("bcrypt");

const router = require("express").Router();

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

//find One
router.get("/:id", async (req, res) => {
  try {
    const dbUsers = await User.findByPk(req.params.id, {});
    res.json(dbUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occurred", err });
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
    const updatedUsers = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

//Delete a User
router.delete("/:id", async (req, res) => {
  try {
    const deUsers = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(deUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// logout
// router.get("/logout", (req,res)=>{
//   req.session.destroy();
//   res.redirect("/home")
// })
//LogOut
router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

module.exports = router;
