const Sequelize = require("sequelize");
const sequelize = require("../../db");

const executive = sequelize.define("Executive", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  portfolio: Sequelize.STRING,
  contact: Sequelize.TEXT,
  yearGroup: Sequelize.STRING,
  image: Sequelize.STRING,
});

const yearGroup = sequelize.define("yearGroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  yearGroup: Sequelize.STRING,
});

const path = require("path");
const fs = require("fs");

class Executive {
  constructor(data, file) {
    this.error = [];
    this.success = [];
    this.data = data;
    this.file = file;
  }
}

Executive.prototype.validate = function () {
  if (this.data.name == "") {
    this.error.push("please enter a name for the Executive");
  }
  if (this.data.yearGroup == "") {
    this.error.push("please enter a portfolio ");
  }
  if (this.data.contact == "") {
    this.error.push("Please add contact");
  }
  if (this.data.yearGroup == "") {
    this.error.push("Please select an year Group");
  }
};

Executive.prototype.cleanUp = function () {
  if (typeof this.data.name != "string") {
    this.data.name = "";
  }
  if (typeof this.data.portfolio != "string") {
    this.data.portfolio = "";
  }
  if (typeof this.data.contact != "string") {
    this.data.contact = "";
  }
  if (typeof this.data.yearGroup != "string") {
    this.data.yearGroup = "";
  }

  if (this.file) {
    let file = this.file.file;
    let filename = Math.random(0, 1) + file.name;
    file.mv("./asset/executiveUploads/" + filename, (err) => {
      if (err) throw err;
    });
    this.data = {
      name: this.data.name,
      portfolio: this.data.portfolio,
      contact: this.data.contact,
      yearGroup: this.data.yearGroup,
      image: filename,
    };
    // console.log(this.data.image);
  } else {
    this.error.push("Please select an Image");
  }
};

Executive.prototype.addExecutive = function () {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let post = await executive.create(this.data);
    if (post) {
      this.success.push("New Executive Added successfully");
      resolve(this.success);
    } else {
      reject(this.error);
    }
  });
};

Executive.prototype.viewExecutiveByYearGroup = function (yearG) {
  return new Promise(async (resolve, reject) => {
    let post = await executive.findAll({ where: { yearGroup: yearG } });
    if (post) {
      resolve(post);
    } else {
      reject(`couldn't fetch all data`);
    }
  });
};
Executive.prototype.viewByYearGroup = function () {
  return new Promise(async (resolve, reject) => {
    let yearGroup = await yearGroup.findOne({
      where: { yearGroup: "2016/2017" },
    });
    if (yearGroup) {
      resolve(yearGroup);
    } else {
      reject();
    }
  });
};

// Executive.prototype.viewYearGroup = function (year) {
//   return new Promise(async (resolve, reject) => {
//     let yearGroup = await yearGroup.findAll({ where: { yearGroup: year } });
//     if (yearGroup) {
//       // console.log(yearGroup)
//       resolve(yearGroup);
//     } else {
//       reject();
//     }
//   });
// };

Executive.prototype.viewExecutive = function () {
  return new Promise(async (resolve, reject) => {
    let results = await executive.findAll();
    if (results) {
      //   console.log( resolve(results,resultsYeargroup));
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.viewYearGroup = function () {
  return new Promise(async (resolve, reject) => {
    let resultsYeargroup = await yearGroup.findAll();
    if (resultsYeargroup) {
      resolve(resultsYeargroup);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.viewExecutiveById = function (id) {
  return new Promise(async (resolve, reject) => {
    let results = await executive.findOne({
      where: { id: id },
    });
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.editExecutive = function (id) {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let updateResult = await executive.update(
      {
        name: this.data.name,
        portfolio: this.data.portfolio,
        contact: this.data.contact,
        yearGroup: this.data.yearGroup,
        image: this.data.image,
      },
      {
        where: { id: id },
      }
    );
    if (updateResult) {
      resolve(updateResult);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.deleteExecutive = function (id) {
  return new Promise(async (resolve, reject) => {
    let uploadDir = path.join(__dirname, "../../asset/executiveUploads/");

    let post = await executive.destroy({
      where: { id: id },
    });
    resolve("Executive was deleted Successfully");
  });

  // return new Promise(async (resolve, reject) => {
  //   let post = await executiveDatabaseController.findOneAndDelete({
  //     _id: new ObjectID(id),
  //   });
  //   if (post) {
  //     resolve();
  //   } else {
  //     reject();
  //   }
  // });
};

Executive.prototype.addYearGroup = function (yeargroup) {
  return new Promise(async (resolve, reject) => {
    // let previousGroup = await yearGroupDatabaseController.findOne({
    //   yearGroup: yearGroup,
    // });

    let post = await yearGroup.create({
      yearGroup: yeargroup,
    });

    if (post) {
      resolve();
    } else {
      reject();
    }
  });
};
module.exports = Executive;
