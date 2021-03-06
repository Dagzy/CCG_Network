'use strict'
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/:id", (req, res) => {
  const { body } = req;
  const { userId, password, isAdmin, updatingPassword } = body;
  const { id } = req.params;
  if (userId === id || isAdmin) {
    if (updatingPassword) {
      const { SALT } = process.env;
      bcrypt
        .genSalt(parseInt(SALT))
        .then((output) =>
          new Promise((resolve, reject) => {
            bcrypt.hash(updatingPassword, output).then((hash) => {
              if (hash) {
                body.password = hash;
                resolve(body);
              } else reject("Error occurred in hasher");
            });
          })
            .then((user) => User.findByIdAndUpdate(id, { $set: user }))
            .then((data) =>
              res.status(data ? 200 : 401).json({
                message: data
                  ? "Password Update Succeeded"
                  : "Password Update Failed",
              })
            )
            .catch(console.log)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "An Error Occurred", err: err });
        });
    } else {
      User.findById(id).then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((didMatch) => {
            if (didMatch) {
              const { password, isAdmin, email, username, ...profile } = body;
              User.findByIdAndUpdate(id, { $set: profile }).then((data) =>
                res.status(data ? 200 : 401).json({
                  message: data ? "Update Succeeded" : "Update Failed",
                })
              );
            } else {
              res.status(401).json({ message: "Password Does Not Match" });
            }
          });
        }
      });
    }
  } else {
    res.status(401).json({ message: "You can only update your own user." });
  }
});
//(DISABLE) user
router.delete("/:id", (req, res) => {
  const { body } = req;
  const { userId, password, isAdmin, email } = body;
  const { id } = req.params;
  if (userId === id || isAdmin) {
    if (password) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || !user.enabled)
            return res.status(401).json({ message: "User Not Found." });
          bcrypt.compare(password, user.password).then((didMatch) => {
            if (didMatch) {
              User.findByIdAndUpdate(id, { $set: { enabled: false } })
                .then((data) => {
                  res
                    .status(200)
                    .json({ message: "User Successfully Deleted" });
                })
                .catch(console.log);
            } else {
              res
                .status(401)
                .json({ message: "Password Doesn't Match Existing User" });
            }
          });
        })
        .catch(console.log);
    }
  } else {
    res.status(401).json({ message: "You can only delete your own user." });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
  .then(user =>{
    const {password, isAdmin, ...profile} = user;
    res.status(200).json(profile);
  })
  .catch(console.log);
});
router.put("/:id/follow", (req, res)=>{
  const { id } = req.params;
  const { userId } = req.body;
  if(userId !== id){
    User.findById(id).then(user => {
      if(!user.following.includes(userId)){
        User.updateOne({_id:id}, {$push:{following:userId}}, {new:true})
        .then(update =>{
          User.updateOne({_id:userId}, {$push:{followers:id}}).then(data => {
            res.status(200).json({message:"User Followed"});
          })
        }).catch(err=>res.status(500).json({message:"Follow Failed, An Error Occurred"}));
      }else{
        res.status(403).json({message:"You already follow that user."});
      }
    })
  }else{
    res.status(403).json({message:"You can't follow yourself"});
  }
});
router.put("/:id/unfollow", (req, res)=>{
  const { id } = req.params;
  const { userId } = req.body;
  if(userId !== id){
    User.findById(id).then(user => {
      if(user.following.includes(userId)){
        User.updateOne({_id:id}, {$pull:{following:userId}}, {new:true})
        .then(update =>{
          User.updateOne({_id:userId}, {$pull:{followers:id}}).then(data => {
            res.status(200).json({message:"User Unfollowed"});
          })
        }).catch(err => res.status(500).json({message:"Unfollow Failed, An Error Occurred"}));
      }else{
        res.status(403).json({message:"You do not follow that user."});
      }
    })
  }else{
    res.status(403).json({message:"You can't unfollow yourself"});
  }
});

module.exports = router;
