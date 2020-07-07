const Event = require("../../model/admin/Event");


exports.addEvent = (req, res) => {
  const event = new Event(req.body, req.files);
  event
    .addEvent()
    .then((success) => {
      req.flash("success", "New event was successfully created.");
      res.redirect("/admin/event");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllEventPage = (req, res) => {
  const event = new Event();
  event
    .viewEvent()
    .then((event) => {
      res.render("admin/viewAll/event", { event: event });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditEvent = (req, res) => {
  const event = new Event();
  event
    .viewEventById(req.params.id)
    .then((data) => {
      res.render("admin/edit/editEvent", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editEvent = (req, res) => {
  const event = new Event(req.body,req.files);
  console.log(req.params.id);
  event
    .editEvent(req.params.id)
    .then((result) => {
      req.flash("success", "event Updated Successfully");
      res.redirect("/admin/viewAllEvent");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteEvent = (req, res) => {
  const event = new Event();
  event
    .deleteEvent(req.params.id)
    .then((results) => {
      req.flash("info", "event deleted Successfully");
      res.redirect("/admin/viewAllEvent");
    })
    .catch((err) => {
      console.log(err);
    });
};
