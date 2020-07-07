const departmentDatabaseController = require("../../db")
  .db("agcm")
  .collection("department");
const ObjectID = require("mongodb").ObjectID;
const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
const path = require("path");
const fs = require("fs");

class Department {
  constructor(data, file) {
    this.error = [];
    this.success = [];
    this.data = data;
    this.file = file;
  }
}

Department.prototype.validate = function () {
  if (this.data.name == "") {
    this.error.push("please enter a name for the department");
  }
  if (this.data.department == "") {
    this.error.push("please enter the name for the departmental head");
  }
  if (this.data.details == "") {
    this.error.push("please enter vision for the department");
  }
  if (this.data.file == "") {
    this.error.push("Please select and Image");
  }
  
};

Department.prototype.cleanUp = function () {
  if (typeof this.data.name != "string") {
    this.data.name = "";
  }
  if (typeof this.data.department != "string") {
    this.data.department = "";
  }
  if (typeof this.data.details != "string") {
    this.data.details = "";
  }
  
  if (!isEmpty(this.file)) {
    let file = this.file.file;
    let filename = Math.random(0, 1)+file.name;
    file.mv("./asset/departmentUploads/"+filename, (err) => {
      if (err) throw err;
    });
    this.data = {
      name: this.data.name,
      department:this.data.department,
      details: this.data.details,
      image: filename,
    };
    // console.log(this.data.image);
  } else {
    this.error.push("Please select an Image");
  }
};

Department.prototype.addDepartment = function () {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let post = await departmentDatabaseController.insertOne(this.data);
    if (post) {
      this.success.push("New Department Added successfully");
      resolve(this.success);
    } else {
      reject(this.error);
    }
  });
};

Department.prototype.viewDepartment = function () {
  return new Promise(async (resolve, reject) => {
    let results = await departmentDatabaseController.find({}).toArray();
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Department.prototype.viewDepartmentById = function (id) {
  return new Promise(async (resolve, reject) => {
    let results = await departmentDatabaseController.findOne({
      _id: new ObjectID(id),
    });
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Department.prototype.editDepartment = function (id) {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let updateResult = await departmentDatabaseController.findOneAndUpdate(
      { _id: new ObjectID(id) },
      {
        $set: {
          name: this.data.name,
          department: this.data.department,
          details: this.data.details,
          image: this.data.image,
        },
      }
    );
    if (updateResult) {
      resolve(updateResult);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Department.prototype.deleteDepartment = function (id) {
  return new Promise(async (resolve, reject) => {
    let uploadDir = path.join(__dirname, "../../asset/departmentUploads/");
    let post = await departmentDatabaseController.findOneAndDelete({
      _id: new ObjectID(id),
    });
    fs.unlink(uploadDir+post.value.image, (err) => {
      resolve("Department was deleted Successfully");
    });
  });
};



module.exports = Department;
