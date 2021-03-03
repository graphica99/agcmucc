const Contact = require("../../model/church/Contact");

exports.contact = (req, res) => {
  const contact = new Contact(req.body);
  contact
    .addContact()
    .then((contact) => {
      req.flash("success", "Message sent successfully");
      res.redirect("/contact");
    })
    .catch((e) => {
      console.log(e);
    });
  // console.log(req.body)
};
