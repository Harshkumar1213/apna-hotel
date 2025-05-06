const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usersController = require("../controllers/users.js"); 


//signup
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post(
  "/signup",
  wrapAsync(usersController.signupPost)
);

//login
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",saveRedirectUrl, 
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),usersController.loginPost);

//logout
router.get("/logout",usersController.logout)

module.exports = router;
