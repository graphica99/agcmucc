const Executive = require("../../model/admin/Executive");
const User = require("../../model/church/User");
const Post = require("../../model/church/Post");
const Contact = require("../../model/church/Contact");
const e = require("express");
exports.adminHomePage = (req, res) => {
  //TODO: a. number of users , b. number of aluminus, c. number of post d. number unapproved post
  let user = new User();
  let contact = new Contact();
  user
    .allUsersCount()
    .then((count) => {
      user
        .allUsersAlumCount()
        .then((alumCount) => {
          ////!!CHANGE THE PERMISSION TO TURE
          user
            .allBirthdayCelebCount()
            .then((bdayCount) => {
              Contact.viewContactCount()
                .then((messageCount) => {
                  if (req.session.user.isAdmin) {
                    console.log(
                      "/*/*/*/*/**/**/**/*===========" +
                        req.session.user.isAdmin
                    );
                    res.render("admin/index", {
                      count: count.count,
                      alumCount: alumCount.count,
                      bdayCount: bdayCount.count,
                      messageCount: messageCount.count,
                    });
                  } else {
                    res.redirect("/");
                  }
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.erroPage = (req, res) => {
  res.render("admin/404");
};
exports.blankPage = (req, res) => {
  res.render("admin/blank");
};

exports.loginPage = (req, res) => {
  res.render("admin/login");
};

//! VIEW ALL USERS.
exports.tablePage = (req, res) => {
  let user = new User();
  user
    .allUsers()
    .then((users) => {
      res.render("admin/allUsers", { users: users });
    })
    .catch((e) => {
      console.log(e);
    });
};

//!VIEW ALL ALUM
exports.tablePageAlum = (req, res) => {
  let user = new User();
  user
    .allUsersAlum()
    .then((users) => {
      res.render("admin/allAlum", { users: users });
    })
    .catch((e) => {
      console.log(e);
    });
};

//! ALL BDAY CELEB
exports.tablePageBday = (req, res) => {
  let user = new User();
  user
    .allBirthdayCeleb()
    .then((users) => {
      res.render("admin/viewAll/allBirthdayCeleb", { users: users });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.tablePageMessage = (req, res) => {
  // console.log('dsf')
  let contact = new Contact();
  contact
    .viewContacts()
    .then((message) => {
      res.render("admin/viewAll/allContacts", { message: message });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.deleteContact = (req, res) => {
  Contact.delectMessage(req.params.id)
    .then((del) => {
      req.flash("info", "contact delected successfully");
      res.redirect("/admin/allMessage");
    })
    .catch((e) => {
      console.log(e);
    });
};
exports.sermonPage = (req, res) => {
  res.render("admin/sermon");
};

exports.eventPage = (req, res) => {
  res.render("admin/event");
};

exports.ministryPage = (req, res) => {
  res.render("admin/ministry");
};

exports.announcementPage = (req, res) => {
  res.render("admin/announcement");
};

exports.aboutPage = (req, res) => {
  res.render("admin/about");
};

exports.executivePage = (req, res) => {
  const executive = new Executive();
  executive
    .viewYearGroup()
    .then((yeargroup) => {
      res.render("admin/executive", { yeargroup: yeargroup });
    })
    .catch((err) => {
      console.log(err);
    });
};
