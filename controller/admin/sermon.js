const Sermon = require("../../model/admin/Sermon");
const { response } = require("express");

exports.addSermon = (req, res) => {
  const sermon = new Sermon(req.body, req.files);
  sermon
    .addSermon()
    .then((success) => {
      req.flash("success", "New Sermon was successfully created.");
      res.redirect("/admin/sermon");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllSermonPage = (req, res) => {
  const sermon = new Sermon();
  sermon
    .viewSermon()
    .then((sermon) => {
      res.render("admin/viewAll/sermon", { sermon: sermon });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditSermon = (req, res) => {
  const sermon = new Sermon();
  sermon
    .viewSermonById(req.params.id)
    .then((data) => {
      res.render("admin/edit/editSermon", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editSermon = (req, res) => {
  const sermon = new Sermon(req.body, req.files);
  sermon
    .editSermon(req.params.id)
    .then((result) => {
      req.flash("success", "Sermon Updated Successfully");
      res.redirect("/admin/viewAllSermon");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteSermon = (req, res) => {
  const sermon = new Sermon();
  sermon
    .deleteSermon(req.params.id)
    .then((results) => {
      req.flash("info", "Sermon deleted Successfully");
      res.redirect("/admin/viewAllSermon");
    })
    .catch((err) => {
      console.log(err);
    });
};
