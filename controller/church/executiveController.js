const Executive = require("../../model/admin/Executive");
const yearGroup = require("../../model/admin/yearGroup");
exports.viewExecutive = (req, res) => {
  let executives = new Executive();
  //    console.log(yearGroup)
  yearGroup
    .findAll()
    .then((year) => {
      executives
        .viewExecutive()
        .then((yearGroup) => {
          res.render("church/executives", {
            year: year,
            yearGroup: yearGroup,
            title: "executive",
          });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

exports.getExecutive = (req, res) => {
  let executives = new Executive();
  executives
    .viewExecutiveByYearGroup(req.body.yearGroup)
    .then((results) => {
      res.json(results);
    })
    .catch(() => res.json([]));
  // console.log(req.body.yearGroup)
};
