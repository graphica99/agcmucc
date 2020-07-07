const Department = require('../../model/admin/Department');

exports.aboutMinistry = (req, res) => {
    let department = new Department();
    department.viewDepartment().then((department)=>{
      res.render("church/ministry",{department:department});
    //   console.log(department)
    }).catch((err)=>{
      console.log(err);
    });
   
  }; 