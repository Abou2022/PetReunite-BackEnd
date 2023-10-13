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
  {
    userFirstName: "Alfred",
    userLastName: "Kim",
    email: "Kiml@fuury.com",
    password: "12345",
  },
  {
    userFirstName: "Isabella",
    userLastName: "Kowel",
    email: "Kowel@fuury.com",
    password: "12345",
  },
  {
    userFirstName: "Mahaddi",
    userLastName: "boundi",
    email: "boundi@fuury.com",
    password: "12345",
  },
  {
    userFirstName: "Laura",
    userLastName: "white",
    email: "white@fuury.com",
    password: "12345",
  },
  {
    userFirstName: "Almac",
    userLastName: "Isidor",
    email: "isidor@fuury.com",
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
    picture: "po.gpg",
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
    picture: "lap.jpg",
  },
  {
    name: "Piglon",
    furryDescription: "Friendly Bonny",
    animal: "Bunny",
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
  {
    name: "Flofi",
    furryDescription: "Small with Big eye",
    animal: "Bunny",
    color: "White",
    breed: "pure Germany Bunny",
    particularSign: "Blue eye",
    lastLocation: "New York Central Park",
    lastDay: "2023-09-20", // Provide a valid date and time
    lastTime: "10:00:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 5, // This should be a valid user_id
    picture: "milow.jpg",
  },
  {
    name: "Royal Eagal",
    furryDescription: "brund feet",
    animal: "Bird",
    color: "yellow",
    breed: "America Focon",
    particularSign: "black beak",
    lastLocation: "Bellevue Park",
    lastDay: "2023-09-21", // Provide a valid date and time
    lastTime: "01:00:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 6, // This should be a valid user_id
    picture: "eagle.jpg",
  },
  {
    name: "Roux",
    furryDescription: "Lot of furry",
    animal: "Panda",
    color: "organe",
    breed: "pure London panda",
    particularSign: "Black nose",
    lastLocation: "Everett Mall Parking",
    lastDay: "2023-09-23", // Provide a valid date and time
    lastTime: "10:35:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 7, // This should be a valid user_id
    picture: "pand.jpg",
  },
  {
    name: "Pan",
    furryDescription: "unique color",
    animal: "Bird",
    color: "White",
    breed: "Africa Pan",
    particularSign: "none",
    lastLocation: "Arizona national Park",
    lastDay: "2023-09-23", // Provide a valid date and time
    lastTime: "10:35:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 8, // This should be a valid user_id
    picture: "pan.jpg",
  },
  {
    name: "kaloao",
    furryDescription: "a lot of furry",
    animal: "Monkey",
    color: "Brun",
    breed: "West Africa Monkey",
    particularSign: "white face",
    lastLocation: "New York central Park",
    lastDay: "2023-09-23", // Provide a valid date and time
    lastTime: "10:35:00", // Provide a valid date and time
    petLost: false,
    petFound: true,
    user_id: 9, // This should be a valid user_id
    picture: "kalao.jpg",
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
