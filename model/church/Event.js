const Events = require("../../model/admin/Event");
const fs = require("fs");
const path = require("path");
const format = require("date-format");
class Event {
  constructor() {
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
    results = await Events.findAll({
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });

    currentDate = new Date();
    fullDate = format.asString("yyyy-MM-dd", currentDate);

    fullTime = format.asString("hh:mm", currentDate);
    // let fullTimeBackEnd = format.asString("hh:mm", results[0].time_end);
    // console.log(results.length);
    if (results.length < 1 || results.length == 0) {
      this.deleteDate = false;
    } else {
      this.deleteDate = true;
    }

    // console.log("fulltime =======" + fullTime);
    // console.log("fullDate =======" + fullDate);
    // console.log("backend fulltime" + fullTimeBackEnd);
    // console.log("backend fullDate" + results[0].date);

    if (
      fullDate >= results[0].date &&
      fullTime >= results[0].time_end &&
      this.deleteDate
    ) {
      let uploadDir = path.join(__dirname, "../../asset/eventUploads/");
      let deleteItem = await Events.destroy({
        where: { id: results[0].id },
      });
      console.log(
        "event delete========================================" + deleteItem
      );
      if (deleteItem) {
        fs.unlink(uploadDir + results[0].image, (err) => {
          resolve("Event was deleted Successfully");
        });
      }
    }
    if (results) {
      resolve(results);
    } else {
      reject(`couldn't view all pages`);
    }
  });
};

module.exports = Event;
