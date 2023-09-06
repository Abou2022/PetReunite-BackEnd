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
    name: "Rex",
    furryDescription: "Friendly dog",
    animal: "Dog",
    color: "Brown",
    breed: "pure",
    particularSign: "None",
    lastLocation: "Park",
    lastTime: "2023-09-05 10:00:00", // Provide a valid date and time
    currentStatus: "Lost",
    user_id: 1, // This should be a valid user_id
    picture: "rex.jpg",
  },
  {
    name: "Milow",
    furryDescription: "Friendly cat",
    animal: "Cat",
    color: "white",
    particularSign: "None",
    lastLocation: "Parking",
    lastTime: "2023-09-05 10:00:00", // Provide a valid date and time
    currentStatus: "Lost",
    user_id: 1, // This should be a valid user_id
    picture: "milow.jpg",
  },
];

const feedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
      individualHooks: true,
    });
    await Furry.bulkCreate(furry);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

feedMe();
