// const postCategoryDatabaseController = require("../../db")
//   .db("agcm")
//   .collection("postCategory");
//  const postDatabaseController = require("../../db")
// .db("agcm")
// .collection("post");
// const Post = require('../../model/church/Post');
// const ObjectID = require("mongodb").ObjectID;

// class PostCategory {
//     constructor(data) {
//       this.error = [];
//       this.success = [];
//       this.data = data;
//     }
//   }

//   PostCategory.prototype.validate = function () {
//     if (this.data.postCategory == " ") {
//       this.error.push("please enter a post Category");
//     }
//   };

//   PostCategory.prototype.cleanUp = function () {
//     if (typeof this.data.postCategory != "string") {
//       this.data.postCategory = "";
//     }
//   };

//   PostCategory.prototype.addPostCategory = function () {
//     return new Promise(async (resolve, reject) => {
//       this.validate();
//       this.cleanUp();
//       let post = await postCategoryDatabaseController.insertOne(this.data);
//       if (post) {
//         this.success.push("New Category Added successfully");
//         resolve(post);
//       } else {
//         reject(this.error);
//       }
//     });
//   };

//   Post.viewAllCat = function(){
//     return new Promise(async (resolve, reject) => {
//         let catAll = await postCategoryDatabaseController.find({}).toArray();
//         if (catAll) {
//           resolve(catAll);
//         } else {
//           reject();
//         }
//       });
//   }

//   PostCategory.prototype.editCategory = function (id) {
//     return new Promise(async (resolve, reject) => {
//       this.validate();
//       this.cleanUp();
//       let updateResult = await postCategoryDatabaseController.findOneAndUpdate(
//         { _id: new ObjectID(id)},
//         {
//           $set: {
//             postCategory: this.data.postCategory
//           },
//         }
//       );
//       if (updateResult) {
//         // console.log(updateResult)
//         resolve(updateResult);
//       } else {
//         reject("couldnt view all pages");
//       }
//     });
//   };

//   PostCategory.prototype.deleteCategory = function(id){
//      return new Promise(async(resolve,reject)=>{
//        let cate = await postCategoryDatabaseController.findOneAndDelete({ _id: new ObjectID(id)})
//        if(cate){
//          resolve();
//        }else{
//          reject()
//        }
//      })
//   }

// module.exports = PostCategory;
