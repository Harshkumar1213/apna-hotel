const express = require("express");
const router = express.Router();
const MyError = require("../utils/myError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { listeingSchema } = require("../schema.js");
const { inLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});



//listeingSchema serverside validation middleware
const validateListing = (req, res, next) => {
  let { error } = listeingSchema.validate(req.body);
  if (error) {
    throw new MyError(404, error);
  } else {
    next();
  }
};

router.route("/")
.get(wrapAsync(listingController.index))
.post(inLoggedIn,upload.single('listing[image]'),
validateListing,wrapAsync(listingController.newCreate))

//renderNewForm listings router
router.get("/new", inLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.show))
.put(inLoggedIn,upload.single('listing[image]'),
isOwner,validateListing,wrapAsync(listingController.update))
.delete(isOwner,inLoggedIn,wrapAsync(listingController.delete))

//edit update listing router
router.get(
  "/:id/edit",
  inLoggedIn,isOwner,wrapAsync(listingController.editUpdate));


module.exports = router;
