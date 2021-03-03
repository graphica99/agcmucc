const Department = require("../../model/admin/Department");

exports.aboutMinistry = (req, res) => {
  Department.findAll()
    .then((department) => {
      res.render("church/ministry", {
        department: department,
        title: "ministry",
      });
      //   console.log(department)
    })
    .catch((err) => {
      console.log(err);
    });
};
