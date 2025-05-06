const User = require("../models/user.js");

module.exports.signupPost = async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registerUser = await User.register(newUser, password);
      req.login(registerUser,(err) =>{
        if(err){
          return next(err)
        }
        req.flash("success", "Welcome to Apna Hotel");
        res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };

module.exports.loginPost = async (req, res) => {
    req.flash("success","Welcome back to Apnahotel");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
  };

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err)
      }
      req.flash("success","logged out!");
      res.redirect("/listings")
    })
  }