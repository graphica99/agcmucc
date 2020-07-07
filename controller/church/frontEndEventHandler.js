const Event = require('../../model/church/Event');
const EventSingle  = require('../../model/admin/Event');

exports.eventPage = (req, res) => {
    let event = new Event();
    event.viewEvent().then((data)=>{
      res.render("church/event",{data:data[0] , dataAll:data});
    }).catch((err)=>{
      console.log(err);
    });
}; 

exports.eventPageSingle = (req, res) => {
  let eventSingle = new EventSingle();
  let event = new Event();
  eventSingle.viewEventById(req.params.id).then((eventSingle)=>{
    event.viewEvent().then((data)=>{
      res.render("church/event-details",{eventSingle:eventSingle,data:data[0]});
    }).catch((err)=>{
      console.log(err);
    })
  }).catch((err)=>{
    console.log(err);
  });
}; 

