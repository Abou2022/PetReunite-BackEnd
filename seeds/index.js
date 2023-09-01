const { Router } = require("express");
const { User, Furry } = require("../models");
const sequelize = require("../config/connection");

const users = [
  {
    user_FirstName: "Alicia",
    user_LastName: "Key",
    email: "alicia@pet.com",
    password: "12345",
  },
  {
    user_FirstName: "Chris",
    user_LastName: "Brown",
    email: "chris@pet.com",
    password: "12345",
  },
  {
    user_FirstName: "Isabelle",
    user_LastName: "Perez",
    email: "isabelle@pet.com",
    password: "12345",
  },
  {
    user_FirstName: "Joel",
    user_LastName: "Same",
    email: "joel@pet.com",
    password: "12345",
  },
];

const furry = [
  {
    name: "",
    furryDescription: "",
    animal: "",
    color: "",
    paricularSign: "",
    lastLocation: "",
    lastTime: "",
    currentStatus: "",
    user_id: "",
    picture: "",
  },
  {
    name: "",
    furryDescription: "",
    animal: "",
    color: "",
    paricularSign: "",
    lastLocation: "",
    lastTime: "",
    currentStatus: "",
    user_id: "",
    picture: "",
  },
  {
    name: "",
    furryDescription: "",
    animal: "",
    color: "",
    paricularSign: "",
    lastLocation: "",
    lastTime: "",
    currentStatus: "",
    user_id: "",
    picture: "",
  },
  {
    name: "",
    furryDescription: "",
    animal: "",
    color: "",
    paricularSign: "",
    lastLocation: "",
    lastTime: "",
    currentStatus: "",
    user_id: "",
    picture: "",
  },
  {
    name: "",
    furryDescription: "",
    animal: "",
    color: "",
    paricularSign: "",
    lastLocation: "",
    lastTime: "",
    currentStatus: "",
    user_id: "",
    picture: "",
  },
];

const feedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
      individualHooks: true,
    });
    await Pet.bulkCreate(pets);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

feedMe();
