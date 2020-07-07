// const app = require('./app');
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/agcm";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  let dbo = db;
  module.exports = dbo;

  let app = require("./app");
  app.listen(3000);
});
