const User = require("../../model/church/User");
const Department = require("../../model/admin/Department");

exports.signUpPage = (req, res) => {
  Department.findAll()
    .then((department) => {
      res.render("church/signUp", { department: department });
    })
    .catch((e) => console.log(e));
};

exports.signUpAlumPage = (req, res) => {
  Department.findAll()
    .then((department) => {
      res.render("church/signUpAlum", { department: department });
    })
    .catch((e) => console.log(e));
};

exports.logInPage = (req, res) => {
  res.render("church/logIn");
};

exports.logIn = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      console.log("results-------------------------------" + result.isAdmin);
      req.session.user = {
        firstName: result.firstName,
        lastName: result.lastName,
        id: result.id,
        isAdmin: result.isAdmin,
      };
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch((e) => {
      req.flash("error", e);
      req.session.save(function () {
        res.redirect("/logIn");
      });
    });
};

exports.signUp = async (req, res) => {
  console.log(req.body.isAlum);
  let user = new User(req.body);
  user
    .register()
    .then((result) => {
      // console.log(result);
      req.session.user = {
        firstName: result.dataValues.firstName,
        lastName: result.dataValues.lastName,
        id: result.dataValues.id,
        isAdmin: result.dataValues.isAdmin,
      };
      req.session.save(function () {
        req.flash("success", "Account created successfully");
        res.redirect("/");
      });
    })
    .catch((e) => {
      console.log("errror============================" + e);
      req.flash("error", e);
      req.session.save(function () {
        res.redirect("/signUp");
      });
    });
};
// exports.signUp = async (req, res) => {
//   let salt = bycrypt.genSaltSync(10);
//   let hashFirstPass = bycrypt.hashSync(req.body.firstPassword, salt);
//   let hashSecondPass = bycrypt.hashSync(req.body.secondPassword, salt);
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     firstPassword: hashFirstPass,
//     secondPassword: hashSecondPass,
//     department: req.body.department.toString(),
//     entryYear: format.asString("yyyy", new Date(req.body.entryYear)),
//     endingYear: format.asString("yyyy", new Date(req.body.endingYear)),
//     yearOfStudy: req.body.yearOfStudy,
//     program: req.body.program,
//     residence: req.body.residence,
//     level: req.body.level,
//     contact: req.body.contact,
//     isAdmin: false,
//     isAlum: false,
//     doB: format.asString("MM-dd", new Date(req.body.doB)),
//     gender: req.body.gender,
//   })
//     .then((result) => {
//       req.session.user = {
//         firstName: result.dataValues.firstName,
//         lastName: result.dataValues.lastName,
//         id: result.dataValues.id,
//         isAdmin: result.dataValues.isAdmin,
//       };
//       req.session.save(function () {
//         req.flash("success", "Account created successfully");
//         res.redirect("/");
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//       req.flash("error", e);
//       req.session.save(function () {
//         res.redirect("/signUp");
//       });
//     });
// };

exports.signUpAlum = (req, res) => {
  let user = new User(req.body);
  user
    .registerAlum()
    .then(function (result) {
      req.session.user = {
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        id: user.data._id,
        isAdmin: user.data.isAdmin,
        isAlum: user.data.isAlum,
      };
      req.session.save(function () {
        req.flash(
          "success",
          "Congratulations! You have been added to the Alumi page."
        );
        res.redirect("/signUpAlum");
      });
    })
    .catch((e) => {
      req.flash("error", e);
      req.session.save(function () {
        res.redirect("/signUp");
      });
    });
};

exports.logOut = (req, res) => {
  req.session.destroy(function () {
    res.redirect("/");
  });
};
