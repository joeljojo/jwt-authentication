const config = require("../config");
const { Sequelize } = require("sequelize");

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.role = require("./Roles")(sequelize, Sequelize);

// establish associations
db.role.belongsToMany(db.user, { through: "UserRoles" });
db.user.belongsToMany(db.role, { through: "UserRoles" });

module.exports = db;
