const Sermon = require("../../model/admin/Sermon");
const { sermonPage } = require("../admin/admin");

exports.sermonPage = (req, res) => {
  Sermon.findAll({})
    .then((sermon) => {
      res.render("church/sermon", {
        sermonOfTheWeek: sermon[0],
        sermon: sermon,
        title: "sermon",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sermonSingle = (req, res) => {
  Sermon.findOne({ where: { id: req.params.id } })
    .then((sermonSingle) => {
      res.render("church/sermon-details", {
        sermonSingle: sermonSingle,
        title: "sermon",
      });
    })
    .then((err) => {
      console.log(err);
    });
};
