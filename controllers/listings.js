//storing a backend core function
const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    let allData = await Listing.find();
    res.render("listing/home.ejs", { allData });
  };

module.exports.renderNewForm = (req, res) => {
    res.render("listing/newListing.ejs");
  }; 

module.exports.newCreate = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listings Created!");
    res.redirect("/listings");
  };

module.exports.editUpdate = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if (!data) {
      req.flash("error", "This Listings is not exits!");
      res.redirect("/listings");
    }
    let imgUrl = data.image.url;
    imgUrl = imgUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listing/edit.ejs", { data,imgUrl});
  };

module.exports.update =async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefine"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    req.flash("success", "Listings was Updated");
    res.redirect(`/listings/${id}`);
  };

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listings does't exists");
      res.redirect("/listings");
    } else {
      res.render("listing/show.ejs", { listing });
    }
  };

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listings was Deleted!");
    res.redirect("/listings");
  }
