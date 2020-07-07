const dotenv = require('dotenv')
dotenv.config();
var MongoClient = require("mongodb").MongoClient;

MongoClient.connect(process.env.CONNECTIONSTRING, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  let dbo = db;
  module.exports = dbo;

  let app = require("./app");
  app.listen(process.env.PORT);
});
