const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

//Create Roles model
const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    paranoid: true, // allow false deletion
  }
);

module.exports = Role;
