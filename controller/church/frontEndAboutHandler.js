const About = require("../../model/admin/About");

exports.aboutPage = (req, res) => {
  let about = new About();
  About.findAll({})
    .then((about) => {
      res.render("church/about", { about: about[0], title: "about" });
      //   console.log(about)
    })
    .catch((err) => {
      console.log(err);
    });
};
