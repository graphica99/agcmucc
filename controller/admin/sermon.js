const Executive = require("../../model/admin/Executive");
const Sermon = require("../../model/admin/Sermon");
const fs = require("fs");
exports.addSermon = (req, res) => {
  // console.log(req.body);
  let filename = Math.random(0, 1) + req.files.file.name;
  Sermon.create({
    title: req.body.title,
    name: req.body.name,
    message: req.body.message,
    image: filename,
    date: req.body.date,
  })
    .then((success) => {
      req.files.file.mv("./asset/sermonUploads/" + filename, (err) => {
        if (err) throw err;
      });
      req.session.save(function () {
        req.flash("success", "New Sermon was successfully created.");
        res.redirect("/admin/sermon");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllSermonPage = (req, res) => {
  Sermon.findAll()
    .then((sermon) => {
      res.render("admin/viewAll/sermon", { sermon: sermon });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditSermon = (req, res) => {
  Sermon.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.render("admin/edit/editSermon", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editSermon = (req, res) => {
  let filename = Math.random(0, 1) + req.files.file.name;
  console.log(req.body);
  Sermon.update(
    {
      title: req.body.title,
      name: req.body.Name,
      message: req.body.message,
      image: filename,
      date: req.body.date,
    },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      console.log(result);
      req.files.file.mv("./asset/sermonUploads/" + filename, (err) => {
        if (err) throw err;
      });
      req.flash("success", "Sermon Updated Successfully");
      res.redirect("/admin/viewAllSermon");
    })
    .catch((err) => {
      console.log("error======================" + err);
      res.redirect("/admin/404");
    });
};

exports.deleteSermon = (req, res) => {
  Sermon.findOne({ where: { id: req.params.id } })
    .then((data) => {
      return data.destroy();
    })
    .then((delData) => {
      fs.unlink("./asset/sermonUploads/" + delData.image, (err) => {
        console.log("department image deleted successfully");
      });
      req.flash("info", "Sermon deleted Successfully");
      res.redirect("/admin/viewAllSermon");
    })
    .catch((e) => console.log(e));
};
