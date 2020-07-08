const Contact = require('../../model/church/Contact');

exports.contact = (req,res) =>{
  let contact = new Contact(req.body);
  contact.addContact().then((contact)=>{
    req.flash('success',contact);
    res.redirect('/contact')
  }).catch((e)=>{
    console.log(e);
  })
  // console.log(req.body)
}