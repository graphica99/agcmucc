// const postDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("post");
// const viewsDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("views");
// const postCategoryDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("postCategory");
// const commentDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("comments");
// const userDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("User");
// const ObjectID = require("mongodb").ObjectID;
// const { isEmpty } = require("../../public/helperFunctions/helpFunctions");
// const path = require("path");
// const fs = require("fs");
// const tc = require("thousands-counter");
// const { resolve } = require("path");
// const { rejects } = require("assert");

// class Post {
//   constructor(data, file) {
//     this.error = [];
//     this.success = [];
//     this.data = data;
//     this.file = file;
//     this.views = 0;
//     this.isCurrentPage = false;
//   }
// }

// Post.prototype.validate = function () {
//   if (this.data.title == "") {
//     this.error.push("please enter a title for the post");
//   }
//   if (this.data.category == "") {
//     this.error.push("please select a category");
//   }
//   if (this.data.arthur == "") {
//     this.error.push("please the arthur for the post");
//   }
//   if (this.data.details == "") {
//     this.error.push("please enter the post details");
//   }
//   if (this.data.file == "") {
//     this.error.push("Please select and Image");
//   }
// };

// Post.prototype.cleanUp = function () {
//   if (typeof this.data.title != "string") {
//     this.data.title = "";
//   }
//   if (typeof this.data.category != "string") {
//     this.data.category = "";
//   }
//   if (typeof this.data.arthur != "string") {
//     this.data.arthur = "";
//   }
//   if (typeof this.data.details != "string") {
//     this.data.details = "";
//   }

//   if (!isEmpty(this.file)) {
//     let file = this.file.file;
//     let filename = Math.random(0, 1) + file.name;
//     file.mv("./asset/postUploads/" + filename, (err) => {
//       if (err) throw err;
//     });
//     this.data = {
//       title: this.data.title,
//       category: this.data.category,
//       arthur: this.data.arthur,
//       details: this.data.details,
//       image: filename,
//       views: this.views,
//       userId: this.data.userId,
//       approvePost: "false",
//       date: new Date(),
//     };
//     console.log(this.file.file.name);
//   } else {
//     this.error.push("Please select an Image");
//   }
// };

// Post.prototype.addPost = function () {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let post = await postDatabaseController.insertOne(this.data);
//     if (post) {
//       this.success.push(
//         "New Post Added successfully. Your post will be approved 24 hours time"
//       );
//       resolve(this.success);
//     } else {
//       reject(this.error);
//     }
//   });
// };

// Post.search = function(searchDate){
//    postDatabaseController.createIndex({
//      title:"text",
//      details:"text",
//     //  arthur:"text"
//    });
//    return new Promise(async (resolve,rejects)=>{
//       if(typeof(searchDate) == 'string'){
//         let search = await postDatabaseController.find({$text:{$search:searchDate},approvePost: "true" }).toArray()
//         if(search){
//           resolve(search)
//         }
//       }
//    });
// }

// Post.prototype.updateApprovePost = function (id, approvePost) {
//   return new Promise(async (resolve, reject) => {
//     // {_id: new ObjectID(id)}
//     // console.log(approvePost)
//     var myquery = { _id: new ObjectID(id) };
//     var newvalues = { $set: { approvePost: approvePost } };
//     let post = await postDatabaseController.updateOne(myquery, newvalues, {
//       $set: { approvePost: approvePost },
//     });
//     if (post) {
//       this.success.push("New Post Added successfully");
//       resolve(post);
//     } else {
//       reject(this.error);
//     }
//   });
// };

// Post.prototype.addComment = function (comment, postId) {
//   return new Promise(async (resolve, reject) => {
//     if (comment.message.length > 100) {
//       this.error.push("Please you cant enter more than 100 words");
//     }
//     let comments = {
//       post_id: postId,
//       comment: comment.message,
//       userFirstName: comment.firstName,
//       userSecondName: comment.secondName,
//       userId: comment.userId,
//       date: new Date(),
//     };
//     let addComment = await commentDatabaseController.insertOne(comments);
//     let viewCommentCount = await commentDatabaseController
//       .find({ post_id: postId })
//       .count();
//     if (addComment) {
//       // console.log(addComment)
//       resolve(addComment);
//     } else {
//       reject(this.error);
//     }
//   });
// };

// Post.prototype.viewComment = function (postId) {
//   return new Promise(async (resolve, reject) => {
//     // let limitNum = 5
//     let sort = { date: -1 };
//     let viewComment = await commentDatabaseController
//       .find({ post_id: postId })
//       .sort(sort)
//       .toArray();
//     let viewCommentCount = await commentDatabaseController
//       .find({ post_id: postId })
//       .sort(sort)
//       .count();
//     if (viewComment) {
//       let viewComments = {
//         viewComment: viewComment,
//         viewCommentCount: viewCommentCount,
//       };
//       resolve(viewComments);
//     } else {
//       reject();
//     }
//   });
// };

// Post.prototype.viewUserPost = function (userId) {
//   return new Promise(async (resolve, reject) => {
//     mysort = { date: 1 };
//     var query = { approvePost: "true" };
//     let results = await postDatabaseController

//       .find({ userId: userId, approvePost: "true" })
//       .sort(mysort)
//       .toArray();
//     if (results) {
//       // console.log(results)
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.viewPost = function (userId) {
//   return new Promise(async (resolve, reject) => {
//     mysort = { date: 1 };
//     var query = { approvePost: "true" };
//     let results = await postDatabaseController

//       .find({ userId: userId, approvePost: "true" })
//       // .limit(5)
//       .sort(mysort)
//       .toArray();

//     let postCount = await postDatabaseController.find({}).count();
//     if (results) {
//       let result = {
//         results: results,
//         postCount: postCount,
//       };
//       // console.log(results)
//       resolve(result);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.viewAllPost = function () {
//   return new Promise(async (resolve, reject) => {
//     mysort = { date: -1 };
//     var query = { approvePost: true };
//     let results = await postDatabaseController.find({}).sort(mysort).toArray();
//     if (results) {
//       // console.log(results)
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.viewAllPostUnapprove = function () {
//   return new Promise(async (resolve, reject) => {
//     var query = { approvePost: "false" };
//     let results = await postDatabaseController
//       .find({ approvePost: "false" })
//       .toArray();
//     if (results) {
//       // console.log(results.length)
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.viewAllPostCount = function () {
//   return new Promise(async (resolve, reject) => {
//     let postCount = await postDatabaseController.find({}).count();
//     if (postCount) {
//       resolve(postCount);
//     } else {
//       resolve(0)
//     }
//   });
// };

// Post.viewAllPostCountUnapproved = function () {
//   return new Promise(async (resolve, reject) => {
//     let postCount = await postDatabaseController
//       .find({ approvePost: "false" })
//       .count();
//     if (postCount) {
//       resolve(postCount);
//     } else {
//       resolve(0)
//     }
//   });
// };

// Post.prototype.viewPostById = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let results = await postDatabaseController.findOne({
//       _id: new ObjectID(id),
//       approvePost: "true",
//     });
//     if (results) {
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.viewPostCat = function (cat) {
//   return new Promise(async (resolve, reject) => {
//     let results = await postDatabaseController
//       .find({
//         category: cat,
//         approvePost: "true",
//       })
//       .toArray();
//     if (results) {
//       // console.log(results)
//       resolve(results);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.getViews = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let join = await postDatabaseController
//       .aggregate([
//         { $match: { _id: new ObjectID(id) } },
//         {
//           $lookup: {
//             from: "views",
//             localField: "_id",
//             foreignField: "post_id",
//             as: "views",
//           },
//         },
//         {
//           $project: {
//             views: 1,
//           },
//         },
//       ])
//       .toArray(async (err, res) => {
//         if (err) throw err;
//         let viewsOnly = res[0].views.length;
//         this.views = viewsOnly;
//         if (res[0].views[0].post_id == id) {
//           let views = tc(this.views, { digits: 2 });
//           resolve(views);
//         } else {
//           reject();
//         }
//       });
//   });
// };

// Post.popularPost = function () {
//   return new Promise(async (resolve, resject) => {
//     let sort = { _id: -1 };
//     var query = { approvePost: "true" };
//     let post = await postDatabaseController
//       .find(query)
//       .sort(sort)
//       .limit(5)
//       .toArray();
//     if (post) {
//       // let arr = post;
//       // let randNom =Math.floor((Math.random() * (post.length-1)) + 1)
//       resolve(post);
//     }
//   });
// };

// Post.prototype.viewPostSingle = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let results = await postDatabaseController.findOne({
//       _id: new ObjectID(id),
//       approvePost: "true",
//     });

//     if (results) {
//       let userPost = await userDatabaseController.findOne({
//         _id: new ObjectID(results.userId),
//       });
//       if (userPost) {
//         let resultPostAndUser = {
//           results: results,
//           userPost: userPost,
//         };

//         resolve(resultPostAndUser);
//       }
//       let data = { post_id: new ObjectID(id), views: this.views };
//       let views = await viewsDatabaseController.insertOne(data);
//       if (views) {
//         // console.log(this.views)
//       }
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.editPost = function (id) {
//   return new Promise(async (resolve, reject) => {
//     this.validate();
//     this.cleanUp();
//     let updateResult = await postDatabaseController.findOneAndUpdate(
//       { _id: new ObjectID(id) },
//       {
//         $set: {
//           title: this.data.title,
//           category: this.data.category,
//           arthur: this.data.arthur,
//           details: this.data.details,
//           image: this.data.image,
//           views: this.views,
//           userId: this.data.userId,
//           approvePost: "true",
//           date: new Date(),
//         },
//       }
//     );
//     if (updateResult) {
//       resolve(updateResult);
//     } else {
//       reject("couldnt view all pages");
//     }
//   });
// };

// Post.prototype.deletePost = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let uploadDir = path.join(__dirname, "../../asset/PostUploads/");
//     //   console.log(uploadDir)
//     let post = await postDatabaseController.findOneAndDelete({
//       _id: new ObjectID(id),
//     });
//     let comment = await commentDatabaseController.deleteMany({
//       post_id : id
//     })
//     // console.log(comment)
//     // console.log(id)
//     fs.unlink(uploadDir + post.value.image, (err) => {
//       resolve("Post was deleted Successfully");
//     });
//   });
// };

// Post.viewAllCat = function () {
//   return new Promise(async (resolve, reject) => {
//     let catAll = await postCategoryDatabaseController.find({}).toArray();
//     let catCount = await postCategoryDatabaseController.find({});
//     if (catAll) {
//       resolve(catAll);
//     } else {
//       reject();
//     }
//   });
// };

// Post.viewAllCatByID = function (id) {
//   return new Promise(async (resolve, reject) => {
//     let catAll = await postCategoryDatabaseController
//       .find({ _id: new ObjectID(id) })
//       .toArray();
//     if (catAll) {
//       resolve(catAll);
//     } else {
//       reject();
//     }
//   });
// };

// Post.pagination = function (pageNum) {
//   return new Promise(async (resolve, reject) => {
//     let perPage = 5;
//     let page = pageNum || 1;
//     var query = { approvePost: "true" };
//     let product = await postDatabaseController
//       .find(query)
//       .skip(perPage * page - perPage);
//     // .limit(perPage);
//     let rawProdunct = await postDatabaseController
//       .find(query)
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .toArray();

//     if (product) {
//       product.count().then((count) => {
//         let pagination = {
//           posts: rawProdunct,
//           current: page,
//           pages: Math.ceil(count / perPage),
//         };
//         //  console.log(rawProdunct)
//         resolve(pagination);
//       });
//     } else {
//       reject();
//     }
//   });
// };
// //!!PAGINATION FOR VIEW CATEGORY
// Post.paginationCate = function (pageCat,pageNum) {
//   return new Promise(async (resolve, reject) => {
//     let perPage = 5;
//     let page = pageNum || 1;
//     let product = await postDatabaseController.find()
//       .skip(perPage * page - perPage);
//     // .limit(perPage);
//     let rawProdunct = await postDatabaseController
//       .find({ approvePost: "true", category:pageCat})
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .toArray();

//     if (product) {
//       product.count().then((count) => {
//         let pagination = {
//           posts: rawProdunct,
//           current: page,
//           pages: Math.ceil(count / perPage),
//         };
//         //  console.log(rawProdunct)
//         resolve(pagination);
//       });
//     } else {
//       reject();
//     }
//   });
// };

// Post.prototype.viewPostToApprove = function (id) {
//   return new Promise(async (resolve, resject) => {
//     let result = await postDatabaseController.findOne({
//       _id: new ObjectID(id),
//     });
//     if (result) {
//       resolve(result);
//     } else {
//       rejects();
//     }
//   });
// };

// module.exports = Post;
