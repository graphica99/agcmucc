const Event = require('../../model/church/Event');
const About = require('../../model/admin/About');
const Sermon = require('../../model/admin/Sermon');

exports.homePage = (req, res) => {
  let event = new Event();
  let about = new About();
  let sermon = new Sermon();

  event.viewEvent().then((data)=>{ 
    about.viewAbout().then((about)=>{
      sermon.viewSermon().then((sermon)=>{
        if(req.session.user){
          res.render("church/index",{data:data[0] , dataAll:data, about:about[0],sermon:sermon[0], user:req.session.user});
        }else{
        res.render("church/index",{data:data[0] , dataAll:data, about:about[0],sermon:sermon[0],user:req.session.user});
        }
      }).catch((err)=>{
        console.log(err);
      })
    }).catch((err)=>{
      console.log(err);
    })
  }).catch((err)=>{
    console.log(err);
  });
};

exports.aboutPage = (req, res) => {
  res.render("church/about");
};

// exports.blogPage = (req, res) => {
//   res.render("church/blog");
// };

exports.blogDetailsPage = (req, res) => {
  res.render("church/blog-details");
};

exports.contactPage = (req, res) => {
  res.render("church/contact");
};

exports.eventDetailsPage = (req, res) => {
  res.render("church/event-details");
};

exports.gallaryPage = (req, res) => {
  res.render("church/gallary");
};

exports.ministriesPage = (req, res) => {
  res.render("church/ministry");
};

exports.myAccountPage = (req, res) => {
  res.render("church/myAccount");
};

exports.ministriesPage = (req, res) => {
    res.render("church/ministry");
  };
