const Sequelize = require("sequelize");
const sequelize = require("../../db");

const yearGroup = sequelize.define("yearGroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  yearGroup: Sequelize.STRING,
});

module.exports = yearGroup;
