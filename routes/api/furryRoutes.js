const router = require("express").Router();
const { Furry, User } = require("../../models");
const bcrypt = require("bcrypt");

// find all
router.get("/", async (req, res) => {
  try {
    const dbFurrys = await Furry.findAll({
      include: [User],
    });
    console.log(dbFurrys);
    res.json(dbFurrys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// find one
router.get("/:id", async (req, res) => {
  try {
    const dbFurrys = await Furry.findByPk(req.params.id, {});
    res.json(dbFurrys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// create Furry

router.post("/", async (req, res) => {
  try {
    const userData = await Furry.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update Pet
router.put("/:id", async (req, res) => {
  try {
    const updatedFurry = await Furry.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedFurry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// delete a Pet
router.delete("/:id", async (req, res) => {
  try {
    const delFurry = await Furry.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(delFurry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

module.exports = router;
