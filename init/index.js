const mongoose = require("mongoose");
const initData = require('./data');
const Listing = require('../models/listing.js');

main().then(res => console.log('connection Database'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/apnahotel');
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({
      ...obj,
      owner:'680b1f050d03c6688a63ecb0'
    }))
    await Listing.insertMany(initData.data);
    console.log('data was insert');
};
// initDB();