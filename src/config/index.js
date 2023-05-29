const dotenv = require("dotenv");
dotenv.config();

// Create configuration object to hold env variables
const config = {
  // Important JWT variables
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  //Api port configuration
  port: process.env.PORT || 3001,
};
module.exports = config;
