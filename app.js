
if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const flash = require("connect-flash")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const dbURL = process.env.ATLAS_URL;

main()
  .then((res) => console.log("connection Database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
}

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl:dbURL,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter: 24*3600,
});

store.on("error",(err)=>{
  console.log("ERROR in MONGO SESSION STORE",err)
});

const sessionOption = {
  store: store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 6 * 24 * 60 * 60 * 1000,
    maxAge: 6 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware using by flash
app.use((req,res,next)=>{
  res.locals.msgSuccess = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next()
});

app.listen(8080, () => {
  console.log("app listeing, 8080");
});

app.get("/",listingsRouter);

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//Universal route
// app.get("*",(req,res,next)=>{
//   next(new myError(404,"page not find"))
// });

//Middleware Error handling
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).render("error.ejs", { message });
});

