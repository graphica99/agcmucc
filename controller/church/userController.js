const User = require("../../model/church/User");
const Department = require("../../model/admin/Department");
const Event = require("../../model/church/Event");
const About = require("../../model/admin/About");
const Sermon = require("../../model/admin/Sermon");
exports.signUpPage = (req, res) => {
  let department = new Department();
  department
    .viewDepartment()
    .then((department) => {
      res.render("church/signUp", { department: department });
    })
    .catch((e) => console.log(e));
};

exports.signUpAlumPage = (req, res) => {
  let department = new Department();
  department
    .viewDepartment()
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
      req.session.user = {
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        id: user.data._id,
        isAdmin: user.data.isAdmin,
        isAlum: user.data.isAlum
      };
      req.session.save(function () {
        res.redirect("/viewAddPost");
      });
    })
    .catch((e) => {
      req.flash("error", e);
      req.session.save(function () {
        res.redirect("/logIn");
      });
    });
};

exports.signUp = (req, res) => {
  let user = new User(req.body);
  user
    .register()
    .then(function (result) {
      req.session.user = {
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        id: user.data._id,
        isAdmin: user.data.isAdmin
      };
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch((e) => {
      req.flash("error", e);
      req.session.save(function () {
        res.redirect("/signUp");
      });
    });
};

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
        isAlum: user.data.isAlum 
      };
      req.session.save(function () {
        req.flash('success','Congratulations! You have been added to the Alumi page.')
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
