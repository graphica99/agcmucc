const Event = require("../../model/admin/Event");
const EventSingle = require("../../model/admin/Event");

exports.eventPage = (req, res) => {
  Event.findAll({
    order: [
      ["date", "ASC"],
      ["time", "ASC"],
    ],
  })
    .then((data) => {
      res.render("church/event", {
        data: data[0],
        dataAll: data,
        title: "event",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.eventPageSingle = (req, res) => {
  Event.findOne({ where: { id: req.params.id } })
    .then((eventSingle) => {
      Event.findAll({})
        .then((data) => {
          res.render("church/event-details", {
            eventSingle: eventSingle,
            data: data[0],
            title: "event",
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
