const Executive = require("../../model/admin/Executive");

exports.addExecutive = (req, res) => {
  const executive = new Executive(req.body, req.files);
  // console.log(req.files)
  // console.log(req.body)
  executive.addExecutive()
    .then((success) => {
      req.flash("success", "New Executive was successfully created.");
      res.redirect("/admin/Executive");
    })
    .catch((err) => { 
      console.log(err);
    });
};

exports.viewAllExecutivePage = (req, res) => {
  const executive = new Executive();
  executive
    .viewExecutive()
    .then((Executive) => {
      // console.log(Executive);
      res.render("admin/viewAll/Executive", { Executive: Executive });
    })
    .catch((err) => {
      console.log(err);
    });
};
 
exports.viewEditExecutive = (req, res) => {
  const executive = new Executive();
  executive
    .viewExecutiveById(req.params.id)
    .then((data) => {
      res.render("admin/edit/editExecutive", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editExecutive = (req, res) => {
  const executive = new Executive(req.body, req.files);
  executive
    .editExecutive(req.params.id)
    .then((result) => {
      req.flash("success", "Executive Updated Successfully");
      res.redirect("/admin/viewAllExecutive");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteExecutive = (req, res) => {
  const executive = new Executive();
  executive
    .deleteExecutive(req.params.id)
    .then((results) => {
      req.flash("info", "Executive deleted Successfully");
      res.redirect("/admin/viewAllExecutive");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addYearGroup = (req, res) => {
  const executive = new Executive(req.body);
  executive
    .addYearGroup(req.body)
    .then((yeargroup) => {
      req.flash("success", "Year group added successful");
      res.redirect("/admin/executive");
    })
    .catch((err) => {
      req.flash("info", err);
      // console.log(err);
    });
};
