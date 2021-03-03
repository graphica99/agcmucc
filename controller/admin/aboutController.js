const About = require("../../model/admin/About");

exports.addAbout = (req, res) => {
  const body = req.body.details;
  About.create({
    details: body,
  })
    .then((results) => {
      req.flash("success", "New About was successfully created.");
      res.redirect("/admin/About");
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.viewAllAboutPage = (req, res) => {
  About.findAll()
    .then((about) => {
      res.render("admin/viewAll/about", { About: about });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditAbout = (req, res) => {
  About.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.render("admin/edit/editAbout", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editAbout = (req, res) => {
  // console.log("about body===========================" + req.body.details);
  // console.log("about body===========================" + req.params.id);
  About.update({ details: req.body.details }, { where: { id: req.params.id } })
    .then((data) => {
      req.flash("success", "About Updated Successfully");
      res.redirect("/admin/viewAllAbout");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
  // const about = new About(req.body, req.files);
  // about
  //   .editAbout(req.params.id)
  //   .then((result) => {
  //     req.flash("success", "About Updated Successfully");
  //     res.redirect("/admin/viewAllAbout");
  //   })
  //   .catch((err) => {
  //     res.redirect("/admin/404");
  //   });
};
