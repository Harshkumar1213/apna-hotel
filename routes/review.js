const express = require("express");
const router = express.Router({mergeParams: true});
const MyError = require("../utils/myError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const {inLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//reviewSchema serverside validation middleware 
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body); 
      if(error){
        throw new MyError(404,error);
      }else{
        next()
      }
  };  

// add reviews route 
router.post("/",inLoggedIn,validateReview,wrapAsync(reviewController.addReview));

//delete reviews route
router.delete("/:reviewId",
  inLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;
