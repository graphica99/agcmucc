const executiveDatabaseController = require("../../db")
  .db("agcm")
  .collection("executive");
const yearGroupDatabaseController = require("../../db")
  .db("agcm")
  .collection("yearGroup");
const ObjectID = require("mongodb").ObjectID;
const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
const path = require("path");
const fs = require("fs");
const compress_images = require('compress-images');
var INPUT_path_to_your_images = `${path.join(__dirname, "../../asset/executiveUploads")}/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}`;
var OUTPUT_path = path.join(__dirname, "../../asset/try");

class Executive {
  constructor(data, file) {
    this.error = [];
    this.success = [];
    this.data = data;
    this.file = file; 
    this.compress();
    console.log(OUTPUT_path)
    // console.log(path.join(__dirname, "../../asset/executiveUploads/"))
  }

  compress(){
    compress_images( INPUT_path_to_your_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
    {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
    {png: {engine: 'pngquant', command: ['--quality=20-50']}},
    {svg: {engine: 'svgo', command: '--multipass'}},
    {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){
console.log('-------------');
console.log(error);
console.log(completed);
console.log(statistic);
console.log('-------------');                                   
});
  }

}

Executive.prototype.validate = function () {
  if (this.data.name == "") {
    this.error.push("please enter a name for the Executive");
  }
  if (this.data.yearGroup == "") {
    this.error.push("please enter a portfolio ");
  }
  if (this.data.contact == "") {
    this.error.push("Please add contact");
  }
  if (this.data.yearGroup == "") {
    this.error.push("Please select an year Group");
  }
};

Executive.prototype.cleanUp = function () {
  if (typeof this.data.name != "string") {
    this.data.name = "";
  }
  if (typeof this.data.portfolio != "string") {
    this.data.portfolio = "";
  }
  if (typeof this.data.contact != "string") {
    this.data.contact = "";
  }
  if (typeof this.data.yearGroup != "string") {
    this.data.yearGroup = "";
  }
 
  if (!isEmpty(this.file)) {
    let file = this.file.file;
    let filename = Math.random(0, 1)+file.name;
    file.mv("./asset/executiveUploads/"+filename, (err) => {
      if (err) throw err;
    });
    this.data = {
    name: this.data.name,
    portfolio: this.data.portfolio,
    contact: this.data.contact,
    yearGroup: this.data.yearGroup,
    image: filename,
    };
    // console.log(this.data.image);
   } else {
    this.error.push("Please select an Image");
  }
};

Executive.prototype.addExecutive = function () {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let post = await executiveDatabaseController.insertOne(this.data);
    if (post) {
      this.success.push("New Executive Added successfully");
      resolve(this.success);
    } else {
      reject(this.error); 
    }
  });
};

Executive.viewByYearGroup = function(){
   return new Promise(async (resolve,rejec) => {
    let yearGroup = await executiveDatabaseController.find({yearGroup:'2016/2017'}).toArray();
    if(yearGroup){
      resolve(yearGroup);
    }else{
      reject();
    }
   });
}

Executive.viewYearGroup = function(year){
  return new Promise(async (resolve,rejec) => {
    let yearGroup = await executiveDatabaseController.find({yearGroup:year}).toArray();
    if(yearGroup){
      // console.log(yearGroup)
      resolve(yearGroup);
    }else{
      reject();
    }
   });
}

Executive.prototype.viewExecutive = function () {
  return new Promise(async (resolve, reject) => {
    let results = await executiveDatabaseController.find({}).toArray();
    let resultsYeargroup = await yearGroupDatabaseController.find({}).toArray();
    if (results) {
      //   console.log( resolve(results,resultsYeargroup));
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.viewYearGroup = function () {
  return new Promise(async (resolve, reject) => {
    let resultsYeargroup = await yearGroupDatabaseController.find({}).toArray();
    if (resultsYeargroup) {
      resolve(resultsYeargroup);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.viewExecutiveById = function (id) {
  return new Promise(async (resolve, reject) => {
    let results = await executiveDatabaseController.findOne({
      _id: new ObjectID(id),
    });
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Executive.prototype.editExecutive = function (id) {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let updateResult = await executiveDatabaseController.findOneAndUpdate(
      { _id: new ObjectID(id) },
      {
        $set: {
          name: this.data.name,
          portfolio: this.data.portfolio,
          contact: this.data.contact,
          yearGroup: this.data.yearGroup,
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

Executive.prototype.deleteExecutive = function (id) {
  return new Promise(async (resolve, reject) => {
    let uploadDir = path.join(__dirname, "../../asset/executiveUploads/");
    
    let post = await executiveDatabaseController.findOneAndDelete({
      _id: new ObjectID(id),
    });
    fs.unlink(uploadDir+post.value.image, (err) => {
      resolve("Executive was deleted Successfully");
    });
  });


  // return new Promise(async (resolve, reject) => {
  //   let post = await executiveDatabaseController.findOneAndDelete({
  //     _id: new ObjectID(id),
  //   });
  //   if (post) {
  //     resolve();
  //   } else {
  //     reject();
  //   }
  // });
};

Executive.prototype.addYearGroup = function (id) {
  return new Promise(async (resolve, reject) => {
    let yearGroup = id.yearGroup;
    // let previousGroup = await yearGroupDatabaseController.findOne({
    //   yearGroup: yearGroup,
    // });

    let post = await yearGroupDatabaseController.insertOne({
      yearGroup: yearGroup,
    });

    if (post) {
      resolve();
    } else {
      reject();
    }

    // console.log(previousGroup.yearGroup);

    // if (previousGroup.yearGroup == yearGroup) {
    //     console.log(yearGroup);
    //     console.log("couldnt add");
    //     console.log('......')
    // } else {

    // }
  });
};
module.exports = Executive;
