const Announcement = require("../../model/admin/Announcement");

exports.addAnnouncement = (req, res) => {
  Announcement.create({ title: req.body.title, details: req.body.details })
    .then((success) => {
      req.flash("success", "New Announcement was successfully created.");
      res.redirect("/admin/announcement");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllAnnouncementPage = (req, res) => {
  Announcement.findAll()
    .then((Announcement) => {
      res.render("admin/viewAll/announcement", { Announcement: Announcement });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditAnnouncement = (req, res) => {
  Announcement.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.render("admin/edit/editAnnouncement", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editAnnouncement = (req, res) => {
  Announcement.update(
    {
      title: req.body.title,
      details: req.body.details,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((result) => {
      req.flash("success", "Announcement Updated Successfully");
      res.redirect("/admin/viewAllAnnouncement");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteAnnouncement = (req, res) => {
  Announcement.destroy({ where: { id: req.params.id } })
    .then((results) => {
      req.flash("info", "Announcement deleted Successfully");
      res.redirect("/admin/viewAllAnnouncement");
    })
    .catch((err) => {
      console.log(err);
    });
};
