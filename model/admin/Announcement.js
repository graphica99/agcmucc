const Sequelize = require("sequelize");
const sequelize = require("../../db");

const announcement = sequelize.define("announcement", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  details: Sequelize.TEXT,
});

module.exports = announcement;
// const announcementDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("announcement");
// const ObjectID = require("mongodb").ObjectID;
// const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
// const path = require("path");
// const fs = require("fs");

// class Announcement {
//   constructor(data, file) {
//     this.error = [];
//     this.success = [];
//     this.data = data;
//     this.file = file;
//   }
// }

// Announcement.prototype.validate = function () {
//   if (this.data.title == "") {
//     this.error.push("please enter a name for the Announcement");
//   }
//   if (this.data.details == "") {
//     this.error.push("please enter details ");
//   }
//   if (this.data.file == "") {
//     this.error.push("Please select and Image");
//   }
// };

// Announcement.prototype.cleanUp = function () {
//   if (typeof this.data.title != "string") {
//     this.data.name = "";
//   }
//   if (typeof this.data.details != "string") {
//     this.data.Announcement = "";
//   }
//   this.data = {
//     title: this.data.title,
//     details: this.data.details,
//   };
// };

// Announcement.prototype.addAnnouncement = function () {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let post = await announcementDatabaseController.insertOne(this.data);
//     if (post) {
//       this.success.push("New Announcement Added successfully");
//       resolve(this.success);
//     } else {
//       reject(this.error);
//     }
//   });
// };

// Announcement.prototype.viewAnnouncement = function () {
//   return new Promise(async (resolve, reject) => {
//     let results = await announcementDatabaseController.find({}).toArray();
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Announcement.viewAnnouncementCount = function () {
//   return new Promise(async (resolve, reject) => {
//     let results = await announcementDatabaseController.find({}).count();
//     if (results) {
//       resolve(results);
//     } else {
//       resolve(0);
//     }
//   });
// };

// Announcement.prototype.viewAnnouncementById = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let results = await announcementDatabaseController.findOne({
//       _id: new ObjectID(id),
//     });
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Announcement.prototype.editAnnouncement = function (id) {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let updateResult = await announcementDatabaseController.findOneAndUpdate(
//       { _id: new ObjectID(id) },
//       {
//         $set: {
//           title: this.data.title,
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

// Announcement.prototype.deleteAnnouncement = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let post = await announcementDatabaseController.findOneAndDelete({
//       _id: new ObjectID(id),
//     });

//     if (post) {
//       resolve();
//     } else {
//       reject();
//     }
//   });
// };

// module.exports = Announcement;
