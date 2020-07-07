const Announcement = require("../../model/admin/Announcement");


exports.addAnnouncement = (req, res) => {
  const announcement = new Announcement(req.body, req.files);
  announcement
    .addAnnouncement()
    .then((success) => {
      req.flash("success", "New Announcement was successfully created.");
      res.redirect("/admin/announcement");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllAnnouncementPage = (req, res) => {
  const announcement = new Announcement();
  announcement
    .viewAnnouncement()
    .then((Announcement) => {
      res.render("admin/viewAll/announcement", { Announcement: Announcement });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditAnnouncement = (req, res) => {
  const announcement = new Announcement();
  announcement
    .viewAnnouncementById(req.params.id)
    .then((data) => {
      res.render("admin/edit/editAnnouncement", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editAnnouncement = (req, res) => {
  const announcement = new Announcement(req.body,req.files);
  announcement
    .editAnnouncement(req.params.id)
    .then((result) => {
      req.flash("success", "Announcement Updated Successfully");
      res.redirect("/admin/viewAllAnnouncement");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteAnnouncement = (req, res) => {
  const announcement = new Announcement();
  announcement
    .deleteAnnouncement(req.params.id)
    .then((results) => {
      req.flash("info", "Announcement deleted Successfully");
      res.redirect("/admin/viewAllAnnouncement");
    })
    .catch((err) => {
      console.log(err);
    });
};
