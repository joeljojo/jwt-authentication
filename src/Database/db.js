const { Sequelize } = require("sequelize");
const config = require("../config");

// Create function to connect to database
async function connectDB() {
  //Create new Sequelize instance and pass connection parameters
  const sequelize = new Sequelize(
    config.database.dbName,
    config.database.username,
    config.database.password,
    {
      host: config.database.host,
      dialect: "postgres",
      port: config.database.port,
      logging: false,
    }
  );

  // Test the connection

  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
}
connectDB();

module.exports = connectDB;
