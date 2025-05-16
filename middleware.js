const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const Review = require("./models/review");


module.exports.isLoggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next) =>{
    let {id} = req.params;
      let listing = await Listing.findById(id);
        if(! listing.owner.equals(res.locals.currentUser._id)){
            req.flash("error","You're not the owner of this listing");
           return  res.redirect(`/listings/${id}`);
        }
        next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.isReviewAuthor = async (req,res,next) =>{
    let {reviewId, id} = req.params;
      let review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currentUser._id)){
            req.flash("error","You're not the author of this review");
           return res.redirect(`/listings/${id}`);
        }
        next();
};


module.exports.preventLoggedInAccess = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("info", "You are already logged in!");
    return res.redirect("/listings");
  }
  next();
};
