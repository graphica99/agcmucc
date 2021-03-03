const Sequelize = require("sequelize");
const sequelize = require("../../db");

const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: Sequelize.STRING,
  email: Sequelize.TEXT,
  firstPassword: Sequelize.STRING,
  secondPassword: Sequelize.STRING,
  department: Sequelize.JSON,
  entryYear: Sequelize.STRING,
  endingYear: Sequelize.STRING,
  yearOfStudy: Sequelize.STRING,
  program: Sequelize.STRING,
  residence: Sequelize.STRING,
  level: Sequelize.STRING,
  contact: Sequelize.STRING,
  isAdmin: Sequelize.STRING,
  isAlum: Sequelize.STRING,
  doB: Sequelize.STRING,
  gender: Sequelize.STRING,
});

// module.exports = user;

// const userDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("User");
// const postDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("post");
const bycrypt = require("bcryptjs");
const ObjectID = require("mongodb").ObjectID;
const format = require("date-format");

class User {
  constructor(data) {
    this.error = [];
    this.success = [];
    this.data = data;
    // use either try and catch or Then and catch
    this.switchUser()
      .then(function (done) {
        console.log(done);
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  switchUser() {
    return new Promise(async (resolve, reject) => {
      let currentDate = format.asString("yyyy", new Date());
      let users = await user.findAll();
      if (users) {
        users.map(async function (user) {
          let entryDate = new Date(user.entryYear).getFullYear();
          let entryDay = `${new Date(user.entryYear).getFullYear()}`;
          let difference = Number(currentDate) - Number(entryDate);
          // console.log(difference);
          let yearOfStudy = user.yearOfStudy;

          if (difference == 1 && difference <= yearOfStudy) {
            user.update(
              { level: "100", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 2 && difference <= yearOfStudy) {
            user.update(
              { level: "200", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 3 && difference <= yearOfStudy) {
            user.update(
              { level: "300", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 4 && difference <= yearOfStudy) {
            user.update(
              { level: "400", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 5 && difference <= yearOfStudy) {
            user.update(
              { level: "500", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 6 && difference <= yearOfStudy) {
            user.update(
              { level: "600", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 7 && difference <= yearOfStudy) {
            user.update(
              { level: "700", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else if (difference == 8 && difference <= yearOfStudy) {
            user.update(
              { level: "800", isAlum: "false" },
              {
                where: { entryYear: entryDay },
              }
            );
          } else {
            user.update(
              { isAlum: "true" },
              {
                where: { entryYear: entryDay },
              }
            );
          }
        });
      }
    });
  }
}

User.prototype.allBirthdayCeleb = function () {
  return new Promise(async (resolve, reject) => {
    let currentDate = format.asString("MM-dd", new Date());
    // let fromDb = format.asString('MM-dd', doB);
    let users = await user.findAll({ where: { doB: currentDate } });
    if (users) {
      resolve(users);
    } else {
      reject();
    }
  });
};

User.prototype.allBirthdayCelebCount = function () {
  return new Promise(async (resolve, reject) => {
    let currentDate = format.asString("MM-dd", new Date());
    let users = await user.findAndCountAll({ where: { doB: currentDate } });
    if (users) {
      resolve(users);
    } else {
      resolve(0);
    }
  });
};

User.prototype.cleanup = function () {
  if (typeof this.data.firstName != "string") {
    this.data.firstName == "";
  }
  if (typeof this.data.email != "string") {
    this.data.email == "";
  }
  if (typeof this.data.lastName != "string") {
    this.data.lastName == "";
  }
  if (typeof this.data.program != "string") {
    this.data.program == "";
  }
  if (typeof this.data.residence != "string") {
    this.data.residence == "";
  }
  if (typeof this.data.contact != "number") {
    this.data.contact == "";
  }
  if (typeof this.data.level != "number") {
    this.data.level == "";
  }

  this.data = {
    firstName: this.data.firstName.trim().toLowerCase(),
    lastName: this.data.lastName.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    firstPassword: this.data.firstPassword,
    secondPassword: this.data.secondPassword,
    department: this.data.department,
    entryYear: format.asString("yyyy", new Date(this.data.entryYear)),
    endingYear: format.asString("yyyy", new Date(this.data.endingYear)),
    yearOfStudy: this.data.yearOfStudy,
    program: this.data.program,
    residence: this.data.residence,
    level: this.data.level,
    contact: this.data.contact,
    isAdmin: false,
    isAlum: this.data.isAlum,
    doB: format.asString("MM-dd", new Date(this.data.doB)),
    gender: this.data.gender,
  };
};

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (
      format.asString("yyyy", new Date(this.data.endingYear)) -
        format.asString("yyyy", new Date(this.data.entryYear)) <
        this.data.yearOfStudy ||
      format.asString("yyyy", new Date(this.data.endingYear)) -
        format.asString("yyyy", new Date(this.data.entryYear)) >
        this.data.yearOfStudy
    ) {
      this.error.push(
        "Please the entry year and the year of completions doesn't corresponds to the years of study"
      );
    }
    if (this.data.firstName == "") {
      this.error.push("Please enter a first name");
    }
    if (this.data.lastName == "") {
      this.error.push("Please enter a last name");
    }

    if (this.data.firstPassword == "") {
      this.error.push("Please enter a password");
    }
    if (this.data.secondPassword == "") {
      this.error.push("Please enter a password");
    }
    if (this.data.firstPassword !== this.data.secondPassword) {
      this.error.push("Please your password do not match");
    }
    if (
      this.data.firstPassword.length < 5 &&
      this.data.secondPassword.length < 5
    ) {
      this.error.push("Please the password must be more than 5 letters");
    }
    if (this.data.contact.length < 10 || this.data.contact.length > 10) {
      this.error.push("Please you contact must be 10 numbers");
    }

    // console.log(this.data.department.split().length);
    if (typeof this.data.department === "string") {
      if (this.data.department.split().length === 1) {
        // console.log("one selected");
      }
    } else if (this.data.department.length >= 3) {
      this.error.push("You can join at most 2 department");
    }

    //!! THIS WILL BE ACTIVATED BEFORE BETA TEST
    let contactExist = await user.findOne({
      where: {
        contact: this.data.contact,
      },
    });

    if (contactExist) {
      this.error.push("contact already exits");
    }
    let emailExist = await user.findOne({
      where: {
        email: this.data.email,
      },
    });
    if (emailExist) {
      this.error.push("email exists");
    }
    resolve();
  });
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    await this.validate();
    this.cleanup();
    if (!this.error.length) {
      let salt = bycrypt.genSaltSync(10);
      this.data.firstPassword = bycrypt.hashSync(this.data.firstPassword, salt);
      let userData = await user.create(this.data);
      resolve(userData);
    } else {
      reject(this.error);
    }
  });
};

User.prototype.registerAlum = function () {
  return new Promise(async (resolve, reject) => {
    await this.validate();
    this.cleanup();
    if (!this.error.length) {
      let salt = bycrypt.genSaltSync(10);
      this.data.firstPassword = bycrypt.hashSync(this.data.firstPassword, salt);
      await user.create(this.data);
      resolve();
    } else {
      reject(this.error);
    }
  });
};

User.prototype.allUsers = function () {
  return new Promise(async (resolve, reject) => {
    let users = await user.findAll({
      where: { isAlum: "false" },
      order: [["id", "ASC"]],
    });
    if (users) {
      resolve(users);
    } else {
      reject();
    }
  });
};

User.prototype.allUsersAlum = function () {
  return new Promise(async (resolve, reject) => {
    // sort
    let users = await user.findAll({
      where: { isAlum: "true" },
      order: [["id", "ASC"]],
    });
    if (users) {
      resolve(users);
    } else {
      reject();
    }
  });
};

User.prototype.allUsersAlumCount = function () {
  return new Promise(async (resolve, reject) => {
    let users = await user.findAndCountAll({ where: { isAlum: "true" } });
    if (users) {
      resolve(users);
    } else {
      resolve(0);
    }
  });
};

User.prototype.allUsersCount = function () {
  return new Promise(async (resolve, reject) => {
    let usersCount = await user.findAndCountAll({ where: { isAlum: "false" } });
    if (usersCount) {
      // console.log("---------------------------------" + usersCount.count);
      resolve(usersCount);
    } else {
      resolve(0);
    }
  });
};

User.prototype.login = function () {
  return new Promise(async (resolve, reject) => {
    let results = await user.findOne({
      contact: this.data.contact,
    });
    // .then((results) => {
    if (
      results &&
      bycrypt.compareSync(this.data.password, results.firstPassword)
    ) {
      resolve(results);
    } else {
      reject("Wrong password / contact");
    }
  });
};

module.exports = User;
