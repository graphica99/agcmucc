const Department = require("../../model/admin/Department");
const fs = require("fs");
exports.addDepartment = (req, res) => {
  let filename = Math.random(0, 1) + req.files.file.name;
  Department.create({
    name: req.body.name,
    department: req.body.department,
    details: req.body.details,
    image: filename,
  })
    .then((success) => {
      req.files.file.mv("./asset/departmentUploads/" + filename, (err) => {
        if (err) throw err;
      });
      req.flash("success", "New Department was successfully created.");
      res.redirect("/admin/ministry");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllDepartmentPage = (req, res) => {
  Department.findAll()
    .then((department) => {
      res.render("admin/viewAll/department", { department: department });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditDepartment = (req, res) => {
  Department.findOne({ where: { id: req.params.id } })
    .then((data) => {
      // console.log("view department**************************" + data);
      res.render("admin/edit/editDepartment", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editDepartment = (req, res) => {
  let filename = Math.random(0, 1) + req.files.file.name;
  // console.log(req.body);
  Department.update(
    {
      name: req.body.name,
      department: req.body.department,
      details: req.body.details,
      image: filename,
    },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      req.files.file.mv("./asset/departmentUploads/" + filename, (err) => {
        if (err) throw err;
      });
      req.flash("success", "Department Updated Successfully");
      res.redirect("/admin/viewAllDepartment");
    })
    .catch((err) => {
      res.redirect("/admin/404");
    });
};

exports.deleteDepartment = (req, res) => {
  Department.findOne({ where: { id: req.params.id } })
    .then((data) => {
      return data.destroy();
    })
    .then((delData) => {
      fs.unlink("./asset/departmentUploads/" + delData.image, (err) => {
        console.log("department image deleted successfully");
      });
      req.flash("info", "department deleted Successfully");
      res.redirect("/admin/viewAllDepartment");
    })
    .catch((e) => console.log(e));
};
