const Amadeus = require("amadeus");
require("dotenv").config("./.env");

const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET,
});

// console.log(process.env.API_KEY);

module.exports = amadeus;
