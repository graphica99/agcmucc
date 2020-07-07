const eventDatabaseController = require("../../db")
  .db("agcm")
  .collection("event");
const ObjectID = require("mongodb").ObjectID;
const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
const path = require("path");
const fs = require("fs");
const { runInThisContext } = require("vm");

class Event {
  constructor(data, file) {
    this.error = [];
    this.success = [];
    this.data = data;
    this.file = file;
  }
}

Event.prototype.validate = function () {
  if (this.data.title == "") {
    this.error.push("please enter a title for the event");
  }
  if (this.data.location == "") {
    this.error.push("please enter a venue for the event");
  }
  if (this.data.details == "") {
    this.error.push("please enter a details for the event");
  }

  if (this.data.file == "") {
    this.error.push("Please select and Image");
  }
  if (this.data.date == "") {
    this.error.push("Please select a date");
  }
  if (this.data.time == "") {
    this.error.push("Please select a time");
  }
  if (this.data.time_end == "") {
    this.error.push("Please select a time to end the program");
  }
  
};

Event.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.location != "string") {
    this.data.location = "";
  }
  if (typeof this.data.details != "string") {
    this.data.details = "";
  }
  if (typeof this.data.date != "string") {
    this.data.date = "";
  }
  if (typeof this.data.time != "string") {
    this.data.time = "";
  }
  if (typeof this.data.time_end != "string") {
    this.data.time_end = "";
  }

  if (!isEmpty(this.file)) {
    let file = this.file.file;
    let filename = Math.random(0, 1)+file.name;
    file.mv("./asset/eventUploads/"+filename, (err) => {
      if (err) throw err;
    });
    this.data = {
      title: this.data.title,
      location: this.data.location,
      details: this.data.details,
      image: filename,
      date: this.data.date,
      time:this.data.time,
      time_end:this.data.time_end
    };
    // console.log(this.data.image);
  } else {
    this.error.push("Please select an Image");
  }
};

Event.prototype.addEvent = function () {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let post = await eventDatabaseController.insertOne(this.data);
    if (post) {
      this.success.push("New Event Added successfully");
      resolve(this.success);
    } else {
      reject(this.error);
    }
  });
};

Event.prototype.viewEvent = function () {
  return new Promise(async (resolve, reject) => {
    let results = await eventDatabaseController.find({}).toArray();
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Event.prototype.viewEventById = function (id) {
  return new Promise(async (resolve, reject) => {
    let results = await eventDatabaseController.findOne({
      _id: new ObjectID(id),
    });
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

Event.prototype.editEvent = function (id) {
  return new Promise(async (resolve, reject) => {
    this.validate();
    this.cleanUp();
    let updateResult = await eventDatabaseController.findOneAndUpdate(
      { _id: new ObjectID(id) },
      {
        $set: {
          title: this.data.title,
          location: this.data.location,
          details: this.data.details,
          image: this.data.image,
          date: this.data.date,
          time:this.data.time,
          time_end:this.data.time_end
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

Event.prototype.deleteEvent = function (id) {
  return new Promise(async (resolve, reject) => {
    let uploadDir = path.join(__dirname, "../../asset/eventUploads/");
    
    let post = await eventDatabaseController.findOneAndDelete({
      _id: new ObjectID(id),
    });
    fs.unlink(uploadDir+post.value.image, (err) => {
      resolve("Event was deleted Successfully");
    });
  });
};

module.exports = Event;
