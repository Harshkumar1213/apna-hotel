const mongoose = require("mongoose");
const Review = require("./review")
const Schema = mongoose.Schema;

const listeingSchema = new Schema({
  title: { 
    type: String, 
    required: true,
    trim: true, 
  },
  description: { 
    type: String, 
    required: true,
    trim: true, 
  },
  image: {
    url:String,
    filename:String
  },
  price: {
    type: Number, 
    required: true 
  },
  location: { 
    type: String, 
    required: true,
    trim: true, 
  },
  country: { 
    type: String, 
    required: true,
    trim: true,
  },
  reviews:[
    {type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  // category:{
  //   type:String,
  //   enum:["rooms","beach","house",""]
  // }
});

listeingSchema.post("findOneAndDelete",async(listing) =>{
  if(listing){
    await Review.deleteMany({_id: {$in : listing.reviews}})
  }
});

const Listing = mongoose.model("Listing", listeingSchema);
module.exports = Listing;
