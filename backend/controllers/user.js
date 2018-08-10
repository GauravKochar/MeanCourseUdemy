const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User = require('../models/user');


exports.createUser = (req,res,next) => {
  bcrypt.hash(req.body.password,10).then( hash =>
  {
      const user=new User({
      email: req.body.email,
      password : hash
      });
      user.save().then(result => {
          res.status(201).json({
              message: 'User Created',
              result: result
          })
      }).catch(err => {
           res.status(500).json({
           message:" Invalid Authentication Credentials"
          })

      });

  });
  }
  exports.userLogin = (req,res,next) => {
    let fetchUser;
    console.log("----------------------------");
    User.findOne({ email: req.body.email}).then( user =>
    {
        if(!user)
        {
            console.log("LoginAeerorr");
          return res.status(401).json({
            message: "Auth failed"
         });
        }
        fetchUser=user;
        console.log("user"+user);
       return  bcrypt.compare(req.body.password,user.password);

    }).then(result =>
    {
      //  console.log(result);
        if(!result)
        {
        return res.status(401).json({
            message: "Auth failed"
         })
        }
       // console.log("id"+fetchUser._id);
        const token=jwt.sign({emailId: fetchUser.email,user: fetchUser._id},process.env.JWT_KEY,{expiresIn:"1h"});
        res.status(200).json({
                token:token,
                expiresIn:3600,
                userId: fetchUser._id
        });

    }).catch(err => {
         return res.status(401).json({
          message:" Invalid Authentication Credentials"
         })

    });





}
