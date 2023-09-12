"use strict";

const { User } = require("../models");

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

const seedUsers = () => User.bulkCreate(users, { individualHooks: true });
module.exports = seedUsers;
