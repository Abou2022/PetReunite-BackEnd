const express = require("express");
// const router = express.Router();
const { User, Furry } = require("../../models");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
