const express = require("express");
const churchController = require("../../controller/church/church");
const fronEndEvenController = require("../../controller/church/frontEndEventHandler");
const fronEndAboutController = require("../../controller/church/frontEndAboutHandler");
const frontEndSermonController = require("../../controller/church/frontEndSermonHandler");
const frontEndMinistry = require("../../controller/church/frontEndMinistry");
const postController = require("../../controller/church/postController");
const userController = require("../../controller/church/userController");
const executiveController = require("../../controller/church/executiveController");
const constactController = require("../../controller/church/contactController");
const router = express.Router();

//get related pages for the church Model
router.get("/", churchController.homePage);
// router.get("/",(req,res)=>{res.send("homepage")})
// router.get("/blog", churchController.blogPage);
// router.get("/blog-details", churchController.blogDetailsPage);
router.get("/contact", churchController.contactPage);
router.get("/gallary", churchController.gallaryPage);
// router.get("/ministry", churchController.ministriesPage);
router.get("/myAccount", churchController.myAccountPage);
router.get("/event-details", churchController.eventDetailsPage);

//post related pages for the church Model

//********EVENT ROUTE FRONT END */
router.get("/event", fronEndEvenController.eventPage);
router.get("/event-details/:id", fronEndEvenController.eventPageSingle);

//********ABOUT ROUTE FRONT END */
router.get("/about", fronEndAboutController.aboutPage);

//********ABOUT ROUTE FRONT END */
router.get("/sermon", frontEndSermonController.sermonPage);
router.get("/sermon-details/:id", frontEndSermonController.sermonSingle);

//********MINISTRY ROUTE FRONT END */
router.get("/ministry", frontEndMinistry.aboutMinistry);

//********USER DASHBOARD ROUTE FRONT END */
router.get("/userDashBoard", postController.userDashBoardIndex);
router.get("/viewAddPost", postController.viewAddPost);
router.get("/viewAllPost", postController.viewAllPost);
router.get("/viewEditPost/:id", postController.viewEditPost);
router.get("/deletePost/:id", postController.deletePost);
router.post("/addPost", postController.addPost);
router.post("/addEditPost/:id", postController.editPost);

//********BLOG ROUTE FRONT END */
// router.get("/blog", postController.viewAllPostFrontEnd);
// router.get("/blog", postController.pagination);
// router.get("/blog/:pageNum", postController.pagination);
// router.get("/blog-details/:id", postController.viewSinglePost);
// router.get("/viewBlogByCategory/:cat/:id", postController.viewBlogByCategory);
// router.post("/comment/:postId", postController.addComment);
// // router.post('/loadComment',postController.viewSinglePost)
// router.get("/loadAllComments/:postId", postController.loadComments);
// router.get("/userPost/:id", postController.userPost);

//********SignUp ROUTE FRONT END */
router.get("/signUp", userController.signUpPage);
router.post("/signUp", userController.signUp);
router.get("/login", userController.logInPage);
router.post("/logIn", userController.logIn);
router.get("/logout", userController.logOut);
router.get("/signUpAlum", userController.signUpAlumPage);
router.post("/signUpAlum", userController.signUpAlum);

// Search route
router.post("/search", postController.search);

//executive route
router.get("/executive", executiveController.viewExecutive);

router.post("/getExecutive", executiveController.getExecutive);

//contact route
router.post("/contact", constactController.contact);
module.exports = router;
