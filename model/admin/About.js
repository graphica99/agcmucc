const { Long } = require("mongodb");
const Sequelize = require("sequelize");
const sequelize = require("../../db");

const about = sequelize.define("about", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  details: {
    type: Sequelize.TEXT,
  },
});

module.exports = about;
// const aboutDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("about");
// const ObjectID = require("mongodb").ObjectID;
// const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
// const path = require("path");
// const fs = require("fs");

// class About {
//   constructor(data, file) {
//     this.error = [];
//     this.success = [];
//     this.data = data;
//     this.file = file;
//   }
// }

// About.prototype.validate = function () {
//   if (this.data.details == "") {
//     this.error.push("please enter details ");
//   }

// };

// About.prototype.cleanUp = function () {
//   if (typeof this.data.details != "string") {
//     this.data.About = "";
//   }
//     this.data = {
//       details: this.data.details,
//     };

// };

// About.prototype.addAbout = function () {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let post = await aboutDatabaseController.insertOne(this.data);
//     if (post) {
//       this.success.push("New About Added successfully");
//       resolve(this.success);
//     } else {
//       reject(this.error);
//     }
//   });
// };

// About.prototype.viewAbout = function () {
//   return new Promise(async (resolve, reject) => {
//     let results = await aboutDatabaseController.find({}).toArray();
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// About.prototype.viewAboutById = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let results = await aboutDatabaseController.findOne({
//       _id: new ObjectID(id),
//     });
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// About.prototype.editAbout = function (id) {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let updateResult = await aboutDatabaseController.findOneAndUpdate(
//       { _id: new ObjectID(id) },
//       {
//         $set: {
//           details: this.data.details,
//         },
//       }
//     );
//     if (updateResult) {
//       resolve(updateResult);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };
