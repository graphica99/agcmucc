const { viewAllExecutivePage } = require("../admin/executiveController");
const Executive = require("../../model/admin/Executive");

exports.viewExecutive = (req, res) => {
  let executives = new Executive();
  //    console.log(yearGroup)
  executives
    .viewYearGroup()
    .then((year) => {
      Executive.viewByYearGroup()
        .then((yearGroup) => {
          res.render("church/executives", { year: year , yearGroup:yearGroup });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

exports.getExecutive = (req,res) => {
   Executive.viewYearGroup(req.body.yearGroup).then((results)=>{
    res.json(results)
   }).catch(()=>res.json([]));
  // console.log(req.body.yearGroup)
}