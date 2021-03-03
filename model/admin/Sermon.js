const Sequelize = require("sequelize");
const sequelize = require("../../db");

const sermon = sequelize.define("sermon", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  name: Sequelize.STRING,
  message: Sequelize.TEXT,
  image: Sequelize.STRING,
  date: Sequelize.STRING,
});

module.exports = sermon;

// const sermonDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("sermon");
// const ObjectID = require("mongodb").ObjectID;

// const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
// const moveFile = require("move-file");
// const path = require("path");
// const fs = require("fs");

// class Sermon {
//   constructor(data, file) {
//     this.error = [];
//     this.success = [];
//     this.data = data;
//     this.file = file;
//   }
// }

// Sermon.prototype.validate = function () {
//   if (this.data.title == "") {
//     this.error.push("please enter a title for the sermon");
//   }
//   if (this.data.Name == "") {
//     this.error.push("please enter a name for the speaker");
//   }
//   if (this.data.message == "") {
//     this.error.push("please enter a message for the sermon");
//   }
//   if (this.data.date == "") {
//     this.error.push("please enter a date for the sermon");
//   }
//   if (this.data.file == "") {
//     this.error.push("Please select and Image");
//   }
// };

// Sermon.prototype.cleanUp = function () {
//   if (typeof this.data.title != "string") {
//     this.data.title = "";
//   }
//   if (typeof this.data.Name != "string") {
//     this.data.Name = "";
//   }
//   if (typeof this.data.message != "string") {
//     this.data.message = "";
//   }
//   if (typeof this.data.date != "string") {
//     this.data.date = "";
//   }

//   if (!isEmpty(this.file)) {
//     let file = this.file.file;
//     let filename = Math.random(0, 1) + file.name;
//     file.mv("./asset/sermonUploads/" + filename, (err) => {
//       if (err) throw err;
//     });
//     this.data = {
//       title: this.data.title,
//       Name: this.data.Name,
//       message: this.data.message,
//       imagename: filename,
//       date: this.data.date,
//     };
//     console.log(this.file.file.name)
//   } else {
//     this.error.push("Please select an Image");
//   }
// };

// Sermon.prototype.addSermon = function () {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let post = await sermonDatabaseController.insertOne(this.data);
//     if (post) {
//       this.success.push("New Sermon Added successfully");
//       resolve(this.success);
//     } else {
//       reject(this.error);
//     }
//   });
// };

// Sermon.prototype.viewSermon = function () {
//   return new Promise(async (resolve, reject) => {
//     mysort = { date: 1};
//     let results = await sermonDatabaseController.find().sort(mysort).toArray();
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Sermon.prototype.viewSermonById = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let results = await sermonDatabaseController.findOne({
//       _id: new ObjectID(id),
//     });
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Sermon.prototype.editSermon = function (id) {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let updateResult = await sermonDatabaseController.findOneAndUpdate(
//       { _id: new ObjectID(id) },
//       {
//         $set: {
//           title: this.data.title,
//           Name: this.data.Name,
//           message: this.data.message,
//           imagename: this.data.imagename,
//           date: this.data.date,
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

// Sermon.prototype.deleteSermon = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let uploadDir = path.join(__dirname, "../../asset/sermonUploads/");
//     let post = await sermonDatabaseController.findOneAndDelete({
//       _id: new ObjectID(id),
//     });
//     fs.unlink(uploadDir + post.value.imagename, (err) => {
//       resolve("Sermon was deleted Successfully");
//     });
//   });
// };

// module.exports = Sermon;
