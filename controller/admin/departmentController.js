const Department = require("../../model/admin/Department");


exports.addDepartment = (req, res) => {
  const department = new Department(req.body, req.files);
  department
    .addDepartment()
    .then((success) => {
      req.flash("success", "New Department was successfully created.");
      res.redirect("/admin/ministry");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllDepartmentPage = (req, res) => {
  const department = new Department();
  department
    .viewDepartment()
    .then((department) => {
      res.render("admin/viewAll/department", { department: department });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditDepartment = (req, res) => {
  const department = new Department();
  department
    .viewDepartmentById(req.params.id)
    .then((data) => {
      res.render("admin/edit/editDepartment", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editDepartment = (req, res) => {
  const department = new Department(req.body,req.files);
  department
    .editDepartment(req.params.id)
    .then((result) => {
      req.flash("success", "Department Updated Successfully");
      res.redirect("/admin/viewAllDepartment");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteDepartment = (req, res) => {
  const department = new Department();
  department
    .deleteDepartment(req.params.id)
    .then((results) => {
      req.flash("info", "department deleted Successfully");
      res.redirect("/admin/viewAllDepartment");
    })
    .catch((err) => {
      console.log(err);
    });
};
