const express = require("express");
const passport = require("passport");
const userController = require("../controllers/users");
const { savedRedirectUrl, preventLoggedInAccess } = require("../middleware");

const router = express.Router();

router
  .route("/signup")
  .get(preventLoggedInAccess, userController.renderSignupForm)
  .post(userController.signup);

router
  .route("/login")
  .get(preventLoggedInAccess, userController.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
