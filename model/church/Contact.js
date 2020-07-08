const contactDatabaseController = require("../../db")
  .db("agcm")
  .collection("contact");
const ObjectID = require("mongodb").ObjectID;


class Contact {
  constructor(data, file) {
    this.error = [];
    this.success = [];
    this.data = data;
  }
}

Contact.prototype.validate = function () {
  if (this.data.name == " ") {
    this.error.push("please enter your name");
  }
  if (this.data.email == " ") {
    this.error.push("please enter email ");
  }
  if (this.data.subject == " ") {
    this.error.push("Please enter subject");
  }
  if (this.data.message == " ") {
    this.error.push("Please enter message");
  }
};

Contact.prototype.cleanUp = function () {
  if (typeof (this.data.name) != "string") {
    this.data.name = "";
  }
  if (typeof (this.data.email) != "string") {
    this.data.email = "";
  }
  if (typeof (this.data.subject) != "string") {
    this.data.subject = "";
  }
  if (typeof (this.data.message) != "string") {
    this.data.message = "";
  }
    this.data = {
      name: this.data.name,
      email: this.data.email,
      subject: this.data.subject,
      message: this.data.message,
    };

};

Contact.prototype.addContact = function () {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let post = await contactDatabaseController.insertOne(this.data);
    if (post) {
      this.success.push("Your message is sent successfully. Expect a response as soon as posible");
      resolve(this.success);
    } else {
      reject(this.error);
    }
  });
};

Contact.viewContactCount = function(){
      return new Promise(async (resolve, reject) => {
    let results = await contactDatabaseController.find({}).count();
    if (results) {
      resolve(results);
    } else {
      resolve(0)
    }
  });
}

Contact.prototype.viewContacts = function(){
    return new Promise(async (resolve, reject) => {
  let results = await contactDatabaseController.find().toArray();
  if (results) {
    //   console.log(results)
    resolve(results);
  } else {
    reject()
  }
});
}

Contact.delectMessage = function (id) {
  return new Promise(async (resolve, reject) => {
    let results = await contactDatabaseController.findOneAndDelete({_id:new ObjectID(id)});
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};


module.exports = Contact;
