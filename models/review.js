const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema= new Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // minimum rating
    max: 5, //maximum rating  
  },
  create_at: {
    type:Date,
    default: Date.now()
  },
  author:{
    type: Schema.Types.ObjectId,
    ref:"User",
  }
});

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;
