const About = require('../../model/admin/About');

exports.aboutPage = (req, res) => {
    let about = new About();
    about.viewAbout().then((about)=>{
      res.render("church/about",{about:about[0]});
    //   console.log(about)
    }).catch((err)=>{
      console.log(err);
    });
   
  }; 