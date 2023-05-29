const dotenv = require("dotenv");
dotenv.config();

// Create configuration object to hold env variables
const config = {
  // Important JWT variables
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  // Database variables
  database: {
    username: process.env.PG_USER,
    dbName: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
  },

  //Api port configuration
  port: process.env.PORT || 3001,
};
module.exports = config;
