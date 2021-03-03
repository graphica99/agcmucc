const Event = require("../../model/admin/Event");
const About = require("../../model/admin/About");
const Sermon = require("../../model/admin/Sermon");
const Announcement = require("../../model/admin/Announcement");
const Devent = require("../../model/church/Event");
exports.homePage = (req, res) => {
  const devent = new Devent();
  Event.findAll({
    order: [
      ["date", "ASC"],
      ["time", "ASC"],
    ],
  })
    .then((data) => {
      About.findAll({})
        .then((about) => {
          Sermon.findAll()
            .then((sermon) => {
              Announcement.count()
                .then((announcementCount) => {
                  Announcement.findAll()
                    .then((announcement) => {
                      // if (req.session.user) {
                      // console.log(about);
                      devent
                        .viewEvent()
                        .then((devent) => {
                          console.log(
                            "devent===============================" +
                              devent[0].id,
                            devent[0].date,
                            devent[0].time_end
                          );
                          res.render("church/index", {
                            data: data[0],
                            // data:[],
                            dataAll: data,
                            // dataAll:[],
                            about: about[0],
                            sermon: sermon[0],
                            // user: req.session.user,
                            announcementCount: announcementCount,
                            announcement: announcement,
                            title: "home",
                          });
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.aboutPage = (req, res) => {
  res.render("church/about"), { title: "about" };
};

// exports.blogPage = (req, res) => {
//   res.render("church/blog");
// };

exports.blogDetailsPage = (req, res) => {
  res.render("church/blog-details");
};

exports.blogDetailsPage = (req, res) => {
  res.render("church/executives", { title: "executive" });
};

exports.blogDetailsPage = (req, res) => {
  res.render("church/event", { title: "event" });
};

exports.contactPage = (req, res) => {
  res.render("church/contact", { title: "contact" });
};

exports.eventDetailsPage = (req, res) => {
  res.render("church/event-details");
};

exports.gallaryPage = (req, res) => {
  res.render("church/gallary", { title: "gallery" });
};

exports.ministriesPage = (req, res) => {
  res.render("church/ministry", { title: "ministry" });
};

exports.myAccountPage = (req, res) => {
  res.render("church/myAccount");
};

// exports.ministriesPage = (req, res) => {
//   res.render("church/ministry", { title: "ministry" });
// };
