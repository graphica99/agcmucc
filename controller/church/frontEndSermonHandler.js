const Sermon = require('../../model/admin/Sermon');
const { sermonPage } = require('../admin/admin');

exports.sermonPage = (req, res) => {
    let sermon = new Sermon();
    sermon.viewSermon().then((sermon)=>{
        res.render("church/sermon",{sermonOfTheWeek:sermon[0], sermon:sermon});
    }).catch((err)=>{
        console.log(err);
    })
  };

  exports.sermonSingle = (req,res) => {
    let sermon = new Sermon();
    sermon.viewSermonById(req.params.id).then((sermonSingle)=>{
        res.render("church/sermon-details",{sermonSingle:sermonSingle});
    }).then((err)=>{
        console.log(err);
    })
  }

 