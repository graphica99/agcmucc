const eventDatabaseController = require("../../db")
  .db("agcm")
  .collection("event");
const ObjectID = require("mongodb").ObjectID;
const fs = require("fs");
const path = require("path");
const format = require('date-format');
class Event {
  constructor(){
    this.deleteDate = false;
  }
}

Event.prototype.viewEvent = function () {
  return new Promise(async (resolve, reject) => {
    let mysort,
      results,
      currentDate,
      fullYear,
      getMonth,
      getMinutes,
      fullDate,
      getHour,
      fullTime,
      getDay;
    mysort = { date: 1, time: 1 };
    results = await eventDatabaseController.find().sort(mysort).toArray();

    currentDate = new Date();
    fullDate = format.asString('yyyy-MM-dd',currentDate);
    // fullYear = currentDate.getFullYear();
    // getMonth = currentDate.getMonth();
    // if (getMonth <= 9) {
    //   getMonth = `0${getMonth + 1}`;
    // } else {
    //   getMonth = `${getMonth + 1}`;
    // }
    // getDay = currentDate.getDate();
    // fullDate = `${fullYear}-${getMonth}-${getDay}`;
    // getHour = currentDate.getUTCHours();
    // getMinutes = currentDate.getUTCMinutes();
    // fullTime = `${getHour + 1}:${getMinutes}`;

    fullTime = format.asString('hh:mm',currentDate);
    // console.log(results.length);
    if(results.length < 1 || results.length == 0){
       this.deleteDate = false;
    }else{
      this.deleteDate = true;
    }
    // console.log(fullDate >= results[0].date)
    // console.log(fullTime >= results[0].time_end);
    // console.log(this.deleteDate)
    // console.log(results.length)
    // console.log(fullDate);
    // console.log(results[0].date)
    // console.log(fullTime)
    // console.log(results[0].time_end)
    // console.log(this.deleteDate)
    // console.log(results[0]._id)
    if (fullDate >= results[0].date && fullTime >= results[0].time_end && this.deleteDate) {
      let uploadDir = path.join(__dirname, "../../asset/eventUploads/");
      let deleteItem = await eventDatabaseController.findOneAndDelete({
        _id: new ObjectID(results[0]._id),
      });
      if (deleteItem) {
        fs.unlink(uploadDir + deleteItem.value.image, (err) => {
          resolve("Event was deleted Successfully");
        });
      }
    }
    if (results) {
      resolve(results);
    } else {
      reject("couldnt view all pages");
    }
  });
};

module.exports = Event;
