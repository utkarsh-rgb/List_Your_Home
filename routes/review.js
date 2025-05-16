const express = require("express");
const router = express.Router({ mergeParams: true }); // To access :id from parent route

const wrapAsync = require("../utils/wrapAsync");
const reviewController = require("../controllers/review");
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware");

// POST a review
router.post("/", isLoggedin, validateReview, wrapAsync(reviewController.createReview));

// DELETE a review
router.delete("/:reviewId", isLoggedin, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
