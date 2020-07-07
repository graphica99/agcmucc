const About = require("../../model/admin/About");

exports.addAbout = (req, res) => {
  const about = new About(req.body, req.files);
  about
    .addAbout()
    .then((success) => {
      req.flash("success", "New About was successfully created.");
      res.redirect("/admin/About");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllAboutPage = (req, res) => {
  const about = new About();
  about
    .viewAbout()
    .then((About) => {
      res.render("admin/viewAll/About", { About: About });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditAbout = (req, res) => {
  const about = new About();
  about
    .viewAboutById(req.params.id)
    .then((data) => {
      res.render("admin/edit/editAbout", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editAbout = (req, res) => {
  const about = new About(req.body,req.files);
  about
    .editAbout(req.params.id)
    .then((result) => {
      req.flash("success", "About Updated Successfully");
      res.redirect("/admin/viewAllAbout");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};
