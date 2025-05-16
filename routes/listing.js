const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedin,isOwner,validateListing} = require("../middleware")
const listingsController = require("../controllers/listings");
const multer = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage });

router
.route("/")
.get( wrapAsync(listingsController.index))

router.post(
  "/",
  (req, res, next) => {
    console.log("POST /listings route triggered");
    next();
  },
  isLoggedin,
  upload.single("listing[image]"),
  // validateListing,
  wrapAsync(listingsController.createListing)
);

// New Listing Form
router.get("/new", isLoggedin, listingsController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync(listingsController.showListing))
   .put(
  isLoggedin,
  isOwner,
  upload.single("listing[image]"), 
  // validateListing,
  wrapAsync(listingsController.updateListings)
)

    .delete( isLoggedin, isOwner,  wrapAsync(listingsController.deleteListings));

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingsController.renderEditForm));

module.exports = router;
