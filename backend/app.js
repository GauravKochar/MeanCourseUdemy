const express=require('express');
const bodyParser=require('body-parser');
const path= require('path');
const mongoose=require('mongoose');
 const app=express();
 const postsRoutes = require('./routes/posts');
  const userRoutes = require('./routes/user');
  var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
  const passport =require('passport');


mongoose.connect("mongodb://localhost:27017/meanCourse").then(() =>{
  console.log('connected to database')
})
.catch(() =>{
console.log("Connection failed");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join(__dirname,"images")));
//  app.use("/",express.static(path.join(__dirname,"angular")));
 app.use((req,res,next) => {

  res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS");
    next();

});
app.use("/api/post",postsRoutes);
app.use("/api/user",userRoutes);





// app.get('/auth/google',
//   passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));


// passport.use(new GoogleStrategy({
//   api_key:'AIzaSyA5jv-cJoAclk7tleB9rayGMF1OKeeAApc',
//   consumerKey:  '73922309474-tul1g81hsnmtr0govmnmsjltsh9elomk.apps.googleusercontent.com' ,
//   consumerSecret: 'tn3_nHpH1bC-dmLY5S08g4l4',
//   callbackURL : "/auth/google/callback"
// },
// function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ email: profile.id }, function (err, user) {
//       return done(err, user);
//     });
// }
// ));
// // app.use((req,res,next) => {
// // res.sendFile(__dirname,path.join("angular","index.html"));
// // });

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//    // res.redirect('/');
//   });

module.exports=app;
