// const dotenv = require("dotenv");
// dotenv.config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("agcmuccc_agcm", "agcmuccc_agcmucc", "Z%YBUH}ym#i)", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// var MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(process.env.CONNECTIONSTRING,function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   let dbo = db;
//   module.exports = dbo;

//   let app = require("./app");
//   app.listen(process.env.PORT || 3000);
// });
