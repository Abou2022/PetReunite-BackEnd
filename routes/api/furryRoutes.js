// const express = require("express");
const router = require("express").Router();
const { Furry, User } = require("../../models");
// const bcrypt = require("bcrypt");

// find all
// router.get("/", (req, res) => {
//   Furry.findAll({
//     // include:[User]
//   })
//     .then((dbFurrys) => {
//       res.json(dbFurrys);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const furryData = await Furry.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(furryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one
router.get("/:id", (req, res) => {
  Furry.findByPk(req.params.id, {})
    .then((dbFurrys) => {
      res.json(dbFurrys);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// create Furry
router.post("/", (req, res) => {
  console.log(req.body);
  const newFurry = {
    ...req.body,
    user_id: req.session.user.id,
  };
  Furry.create(newFurry)
    .then((newFurry) => {
      req.session.Furry = {
        id: newFurry.id,
        Furryname: newFurry.Furryname,
      };
      res.json(newFurry);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// update Pet
router.put("/:id", (req, res) => {
  Furry.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedFurry) => {
      res.json(updatedFurry);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// delete a Pet
router.delete("/:id", (req, res) => {
  Furry.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delFurry) => {
      res.json(delFurry);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;
