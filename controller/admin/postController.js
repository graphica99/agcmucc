// const PostCategory = require("../../model/admin/Post");
// const Post = require("../../model/church/Post");

// exports.viewPost = (req, res) => {
//   res.render("admin/post");
// };

// exports.addPostCategory = (req, res) => {
//   let postCat = new PostCategory(req.body);
//   postCat
//     .addPostCategory()
//     .then((cat) => {
//       req.flash("success", "Category added Successfully");
//       res.redirect("/admin/posts");
//       // console.log(cat);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // console.log(req.body);
// };

// exports.viewAllPostUnapprove = (req, res) => {
//   let post = new Post();
//   post
//     .viewAllPostUnapprove()
//     .then((post) => {
//       //   console.log(post)
//       res.render("admin/viewAll/allPostUnapprove", { post: post });
//     })
//     .catch((e) => console.log(e));
// };

// exports.viewAllPost = (req, res) => {
//   let post = new Post();
//   post
//     .viewAllPost()
//     .then((post) => {
//       //  console.log(post)
//       res.render("admin/viewAll/allPost", { post: post });
//     })
//     .catch((e) => console.log(e));
// };

// exports.approvePost = (req, res) => {
//   let post = new Post();
//   post
//     .updateApprovePost(req.body.id, req.body.approveComment)
//     .then((approve) => {
//       //    console.log(req.body.approveComment)
//       res.send(approve);
//       // console.log(approve)
//     })
//     .catch((e) => {
//       console.log(e);
//     });
//   // console.log(req.body.id);
//   // console.log(req.body.approveComment)
//   // console.log('working')
// };

// exports.viewPostToApprove = (req, res) => {
//   let post = new Post();
//   post
//     .viewPostToApprove(req.params.postID)
//     .then((singlePost) => {
//       res.render("admin/viewPostToApprove", {
//         singlePost: singlePost,
//       });
//       // console.log(comments)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.viewAllPostCategory = (req, res) => {
//   Post.viewAllCat()
//     .then((cat) => {
//       res.render("admin/viewAll/viewAllPostCategory", { cat: cat });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// exports.viewPostCategoryById = (req, res) => {
//   Post.viewAllCatByID(req.params.id)
//     .then((catSingle) => {
//       //  console.log(catSingle)
//       res.render("admin/edit/editCategory", { catSingle: catSingle[0] });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// exports.editCategory = (req, res) => {
//   let postCategory = new PostCategory(req.body);
//   postCategory
//     .editCategory(req.params.id)
//     .then((response) => {
//       req.flash("success", "Your category is updated Successfully");
//       res.redirect("/admin/viewAllPostCategory");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// exports.deleteCategory = (req,res) => {
//     let postCategory = new PostCategory();
//     postCategory.deleteCategory(req.params.id).then((resp)=>{
//        req.flash('info', " Your category is deleted succesfully");
//        res.redirect('/admin/viewAllPostCategory');
//     }).catch((e)=>{
//         console.log(e);
//     })
// }
