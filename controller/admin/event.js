const Event = require("../../model/admin/Event");
const fs = require("fs");
exports.addEvent = (req, res) => {
  let filename = Math.random(0, 1) + req.files.file.name;
  Event.create({
    title: req.body.title,
    location: req.body.location,
    details: req.body.details,
    image: filename,
    date: req.body.date,
    time: req.body.time,
    time_end: req.body.time_end,
  })
    .then((success) => {
      req.files.file.mv("./asset/eventUploads/" + filename, (err) => {
        if (err) throw err;
      });
      req.flash("success", "New event was successfully created.");
      res.redirect("/admin/event");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllEventPage = (req, res) => {
  Event.findAll()
    .then((event) => {
      res.render("admin/viewAll/event", { event: event });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditEvent = (req, res) => {
  Event.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.render("admin/edit/editEvent", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editEvent = (req, res) => {
  let filename = Math.random(0, 1) + req.files.file.name;
  Event.update(
    {
      title: req.body.title,
      location: req.body.location,
      details: req.body.details,
      image: filename,
      date: req.body.date,
      time: req.body.time,
      time_end: req.body.time_end,
    },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      req.files.file.mv("./asset/eventUploads/" + filename, (err) => {
        if (err) throw err;
      });
      req.flash("success", "event Updated Successfully");
      res.redirect("/admin/viewAllEvent");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

// exports.deleteEvent = (req, res) => {
//   Event.destroy({ where: { id: req.params.id } })
//     .then((results) => {
//       req.flash("info", "event deleted Successfully");
//       res.redirect("/admin/viewAllEvent");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.deleteEvent = (req, res) => {
  Event.findOne({ where: { id: req.params.id } })
    .then((data) => {
      return data.destroy();
    })
    .then((delData) => {
      fs.unlink("./asset/eventUploads/" + delData.image, (err) => {
        console.log("department image deleted successfully");
      });
      req.flash("info", "event deleted Successfully");
      res.redirect("/admin/viewAllEvent");
    })
    .catch((e) => console.log(e));
};
