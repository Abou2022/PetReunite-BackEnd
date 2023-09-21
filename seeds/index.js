const { Router } = require("express");
const { User, Furry } = require("../models");

const sequelize = require("../config/connection");

const users = [
  {
    userFirstName: "Alicia",
    userLastName: "Key",
    email: "alicia@pet.com",
    password: "12345",
  },
  {
    userFirstName: "Chris",
    userLastName: "Brown",
    email: "chris@pet.com",
    password: "12345",
  },
  {
    userFirstName: "Isabelle",
    userLastName: "Perez",
    email: "isabelle@pet.com",
    password: "12345",
  },
  {
    userFirstName: "Joel",
    userLastName: "Same",
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
    lastDay: "2023-09-05", // Provide a valid date and time
    lastTime: "10:00:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 1, // This should be a valid user_id
    // picture: "rex.jpg",
  },
  {
    name: "Milow",
    furryDescription: "Friendly cat",
    animal: "Cat",
    color: "white",
    breed: "not pure",
    particularSign: "None",
    lastLocation: "Parking",
    lastDay: "2023-09-05", // Provide a valid date and time
    lastTime: "11:00:00", // Provide a valid date and time
    petLost: true,
    petFound: false,
    user_id: 2, // This should be a valid user_id
    picture: "milow.jpg",
  },
  {
    name: "Piglon",
    furryDescription: "Friendly Bonny",
    animal: "Bonny",
    color: "white gray",
    breed: "not pure",
    particularSign: "None",
    lastLocation: "South Park",
    lastDay: "2023-09-06s", // Provide a valid date and time
    lastTime: "09:00:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 3, // This should be a valid user_id
    picture: "milow.jpg",
  },
  {
    name: "Bly",
    furryDescription: "Friendly Bird",
    animal: "Bird",
    color: "gray",
    breed: "not pure",
    particularSign: "None",
    lastLocation: "SouthWest Park",
    lastDay: "2023-09-06", // Provide a valid date and time
    lastTime: "09:00:00", // Provide a valid date and time
    petLost: true,
    petFound: false,
    user_id: 4, // This should be a valid user_id
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
