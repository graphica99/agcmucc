const userDatabaseController = require("../../db")
  .db("agcm")
  .collection("User");
const postDatabaseController = require("../../db")
  .db("agcm")
  .collection("post");
  const bycrypt = require('bcryptjs');
const ObjectID = require("mongodb").ObjectID;
const format = require('date-format');

class User{
    constructor(data) {
    this.error = [];
    this.success = [];
    this.data = data;
    // use either try and catch or Then and catch
    this.switchUser().then(function(done){
      console.log(done);
    }).catch(function(e){
      console.log(e)
    });
  }
    switchUser(){
    return new Promise(async (resolve,reject)=>{
      let currentDate = format.asString('yyyy',new Date());
      let users = await userDatabaseController.find({}).toArray();
      if(users){
      users.map(async function(user){
        let entryDate = new Date(user.entryYear).getFullYear();
        let entryDay = `${new Date(user.entryYear).getFullYear()}`;
        let difference = (Number(currentDate) - Number(entryDate));
        // console.log(difference);
        let yearOfStudy = user.yearOfStudy;
        
        if(difference == 1 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'100',isAlum:'false'}})
        }else if(difference == 2 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'200',isAlum:'false'}})
        }else if(difference == 3 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'300',isAlum:'false'}})
        }else if(difference == 4 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'400',isAlum:'false'}})
        }else if(difference == 5 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'500',isAlum:'false'}})
        }else if(difference == 6 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'600',isAlum:'false'}})
        }else if(difference == 7 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'700',isAlum:'false'}})
        }else if(difference == 8 && difference <= yearOfStudy){
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'800',isAlum:'false'}})
        }else{
          userDatabaseController.updateMany({entryYear:entryDay},{$set:{isAlum:'true'}})
        }
        // switch (difference) {
        //   case 1 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'100'}})
        //     break;
        //   case 2 : 
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'200'}})
        //     break;
        //   case 3 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'300'}})
        //     break;
        //   case 4 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'400'}})
        //     break;
        //   case 5 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'500'}})
        //     break;
        //   case 6 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'600'}})
        //     break;
        //   case 7 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'700'}})
        //     break;
        //   case 8 :
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{level:'100'}})
        //     break;  
        //   default:
        //     // if(difference > yearOfStudy){
        //     await userDatabaseController.updateMany({entryYear:entryDay},{$set:{isAlum:'true'}})
        //     // }
        //     break;
        // }
      });
    }
    })
  }

}

User.prototype.allBirthdayCeleb = function(){
  return new Promise(async (resolve,reject)=>{
    let currentDate = format.asString('MM-dd', new Date());
    // let fromDb = format.asString('MM-dd', doB);
    let users = await userDatabaseController.find({doB:currentDate}).toArray()
    if(users){
      resolve(users);
    }else{
      reject();
    }
  })
}

User.prototype.allBirthdayCelebCount = function(){
  return new Promise(async (resolve,reject)=>{
    let currentDate = format.asString('MM-dd', new Date());
    let users = await userDatabaseController.find({doB:currentDate}).count()
    if(users){
      resolve(users);
    }else{
      resolve(users);
    }
  })
}


User.prototype.cleanup = function () {
  if (typeof this.data.firstName != "string") {
    this.data.firstName == "";
  }
  if (typeof this.data.email != "string") {
    this.data.email == "";
  }
  if (typeof this.data.lastName != "string") {
    this.data.lastName == "";
  }
  if (typeof this.data.program != "string") {
    this.data.program == "";
  }
  if (typeof this.data.residence != "string") {
    this.data.residence == "";
  }
  if (typeof this.data.contact != "number") {
    this.data.contact == "";
  }
  if (typeof this.data.level != "number") {
    this.data.level == "";
  }
  
  this.data = {
    firstName: this.data.firstName.trim().toLowerCase(),
    lastName: this.data.lastName.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    firstPassword: this.data.firstPassword,
    secondPassword: this.data.secondPassword,
    department:{
        departments: this.data.department
    },
    entryYear: format.asString('yyyy',new Date(this.data.entryYear)),
    endingYear: format.asString('yyyy',new Date(this.data.endingYear)),
    yearOfStudy: this.data.yearOfStudy,
    program: this.data.program,
    residence:this.data.residence,
    level:this.data.level,
    contact:this.data.contact,
    isAdmin: false,
    isAlum: this.data.isAlum,
    doB: format.asString('MM-dd',new Date(this.data.doB)),
    gender: this.data.gender
  };
};

User.prototype.validate = function () {
    return new Promise(async (resolve, reject) => {
      if( ((format.asString('yyyy',new Date(this.data.endingYear))) - (format.asString('yyyy',new Date(this.data.entryYear)))) < (this.data.yearOfStudy) || ((format.asString('yyyy',new Date(this.data.endingYear))) - (format.asString('yyyy',new Date(this.data.entryYear)))) > (this.data.yearOfStudy) ){
          this.error.push("Please the entry year and the year of completions doesn't corresponds to the years of study")
      }
      if (this.data.firstName == "") {
        this.error.push("Please enter a first name");
      }
      if (
        this.data.lastName == "" 
      ) {
        this.error.push("Please enter a last name");
      }

      if (this.data.firstPassword == "") {
        this.error.push("Please enter a password");
      }
      if (this.data.secondPassword == "") {
        this.error.push("Please enter a password");
      }
      if(this.data.firstPassword !== this.data.secondPassword){
        this.error.push("Please your password do not match");
      }
      if (this.data.firstPassword.length < 5 && this.data.secondPassword.length < 5) {
        this.error.push("Please the password must be more than 5 letters");
      }
      if (this.data.contact.length < 10 || this.data.contact.length > 10) {
        this.error.push("Please you contact must be 10 numbers");
      }
      // if (this.data.department.length > 10 ){
      //   console.log(this.data.department.length)
      //   this.error.push("You can join at most 2 department");
      // }
      //!! THIS WILL BE ACTIVATED BEFORE BETA TEST 
      let contactExist = await userDatabaseController.findOne({
        contact: this.data.contact,
      });
      if (contactExist) {
        this.error.push("contact already exits");
      }
      let emailExist = await userDatabaseController.findOne({ email: this.data.email });
      if (emailExist) {
        this.error.push("email exists");
      }
      resolve();
    });
  };

User.prototype.register = function () {
   return new Promise(async (resolve,reject)=>{
     await this.validate();
     this.cleanup();
     if(!this.error.length){
        let salt = bycrypt.genSaltSync(10);
        this.data.firstPassword = bycrypt.hashSync(this.data.firstPassword, salt);
        await userDatabaseController.insertOne(this.data);
        resolve();
     }else{
         reject(this.error);
     }
   });
};

User.prototype.registerAlum = function () {
  return new Promise(async (resolve,reject)=>{
    await this.validate();
    this.cleanup();
    if(!this.error.length){
       let salt = bycrypt.genSaltSync(10);
       this.data.firstPassword = bycrypt.hashSync(this.data.firstPassword, salt);
       await userDatabaseController.insertOne(this.data);
       resolve();
    }else{
        reject(this.error);
    }
  });
};


User.prototype.allUsers = function(){
  return new Promise(async (resolve,reject)=>{
    var mysort = {level: 1 };
    let users = await userDatabaseController.find({isAlum:'false'}).sort(mysort).toArray();
    if(users){
      resolve(users)
    }else{
      reject();
    }
  })
}


User.prototype.allUsersAlum = function(){
  return new Promise(async (resolve,reject)=>{
    var mysort = {level: 1 };
    let users = await userDatabaseController.find({isAlum:'true'}).sort(mysort).toArray();
    if(users){
      resolve(users)
    }else{
      reject();
    }
  })
}
User.prototype.allUsersAlumCount = function(){
  return new Promise(async (resolve,reject)=>{
    var mysort = {level: 1 };
    let users = await userDatabaseController.find({isAlum:'true'}).count();
    if(users){
      resolve(users)
    }else{
      resolve(users)
    }
  })
}

User.prototype.allUsersCount = function(){
  return new Promise(async (resolve,reject)=>{
    let usersCount = await userDatabaseController.find({isAlum:'false'}).count();
    if(usersCount){
      resolve(usersCount)
    }else{
      resolve(usersCount)
    }
  })
}


User.prototype.login = function () {
   return new Promise( async (resolve, reject) => {
      let results =  await userDatabaseController.findOne({ contact: this.data.contact })
        // .then((results) => {
          if (results && bycrypt.compareSync(this.data.password, results.firstPassword)){
            this.data = results;
            resolve(this.data);
          } else {
            reject("Wrong password / contact");
          }
    });
};

module.exports = User;
