const express = require("express");
const router = express.Router();
const adminController = require("../../controller/admin/admin");
const sermonController = require("../../controller/admin/sermon");
const eventController = require("../../controller/admin/event");
const departmentController = require("../../controller/admin/departmentController");
const announcementController = require("../../controller/admin/announcementController");
const aboutController = require("../../controller/admin/aboutController");
const executiveController = require("../../controller/admin/executiveController");
const postController = require("../../controller/admin/postController");
const { route } = require("../church/church");
//************ GET ROUTES FOR ADMIN VIEWS**********/
router.get("/", adminController.adminHomePage);

router.get("/404", adminController.erroPage);

router.get("/blank", adminController.blankPage);

router.get("/login", adminController.loginPage);

router.get("/allUsers", adminController.tablePage);

router.get("/allAlum", adminController.tablePageAlum);

router.get('/allBirthdayCeleb', adminController.tablePageBday);

router.get("/sermon", adminController.sermonPage);

router.get("/event", adminController.eventPage);

router.get("/ministry", adminController.ministryPage);

router.get("/announcement", adminController.announcementPage);

router.get("/about", adminController.aboutPage);

router.get("/executive", adminController.executivePage);

// **********SERMON ROUTES*********//
//get routes for sermon
router.get("/viewAllSermon", sermonController.viewAllSermonPage);

router.get("/deleteSermon/:id", sermonController.deleteSermon);

router.get("/editSermon/:id", sermonController.viewEditSermon);

//post related routes for sermon
router.post("/sermon", sermonController.addSermon);

router.post("/editSermon/:id", sermonController.editSermon);

//*******************EVENTS ROUTES****************/
//get routes for events
router.get("/viewAllEvent", eventController.viewAllEventPage);

router.get("/deleteEvent/:id", eventController.deleteEvent);

router.get("/editEvent/:id", eventController.viewEditEvent);

//post related routes for sermon
router.post("/event", eventController.addEvent);

router.post("/editEvent/:id", eventController.editEvent);

//**************** DEPARTMENT ROUTES*******************/
//get routes for departments
router.get("/viewAllDepartment", departmentController.viewAllDepartmentPage);

router.get("/deleteDepartment/:id", departmentController.deleteDepartment);

router.get("/editDepartment/:id", departmentController.viewEditDepartment);

//post related routes for department
router.post("/department", departmentController.addDepartment);

router.post("/editDepartment/:id", departmentController.editDepartment);

//**************** ANNOUNCEMENTS ROUTES*******************/
//get routes for announcement
router.get(
  "/viewAllAnnouncement",
  announcementController.viewAllAnnouncementPage
);

router.get(
  "/deleteAnnouncement/:id",
  announcementController.deleteAnnouncement
);

router.get(
  "/editAnnouncement/:id",
  announcementController.viewEditAnnouncement
);

//post related routes for announcement
router.post("/announcement", announcementController.addAnnouncement);

router.post("/editAnnouncement/:id", announcementController.editAnnouncement);

//**************** ABOUT PAGE ROUTES*******************/
//get routes for about
router.get("/viewAllAbout", aboutController.viewAllAboutPage);

router.get("/editAbout/:id", aboutController.viewEditAbout);

//post related routes for about
router.post("/about", aboutController.addAbout);

router.post("/editAbout/:id", aboutController.editAbout);

//************ EXECUTIVE PAGE ROUTES******************/
//get routes for executive
router.get("/viewAllExecutive", executiveController.viewAllExecutivePage);

router.get("/deleteExecutive/:id", executiveController.deleteExecutive);

router.get("/editExecutive/:id", executiveController.viewEditExecutive);

//post related routes for executive
router.post("/executive", executiveController.addExecutive);

router.post("/editExecutive/:id", executiveController.editExecutive);

router.post("/addYearGroup", executiveController.addYearGroup);

//post related routes for Blog
router.get("/posts", postController.viewPost);

router.get('/viewAllPostCategory',postController.viewAllPostCategory)

router.post('/addPostCategory',postController.addPostCategory)

router.get('/allPost',postController.viewAllPost);

router.get('/allPostUnapprove', postController.viewAllPostUnapprove)

router.post('/approvePost', postController.approvePost);

router.get('/viewPostToApprove/:postID',postController.viewPostToApprove)

router.get('/editCat/:id',postController.viewPostCategoryById)

router.post('/editCat/:id',postController.editCategory);

router.get('/deleteCat/:id',postController.deleteCategory)
module.exports = router;
