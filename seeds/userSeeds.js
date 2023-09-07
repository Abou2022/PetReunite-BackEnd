"use strict";

const { User } = require("../models");

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

const seedUsers = () => User.bulkCreate(users, { individualHooks: true });
module.exports = seedUsers;
