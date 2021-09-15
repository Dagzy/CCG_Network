const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
// User.findByIdAndUpdate(mongoose.Types.ObjectId("614161d5c6f20ad59a2c5545"), {isAdmin:true}).then(u => {
//   console.log(u);
// })
//create a post
router.post("/", (req, res) => {
  const { body } = req;
  const p = new Post(body);
  p.save()
    .then( post => {
      console.log(post);
      res.status(200).json({ message: "Post Created!", postId:post._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Post Failed To Create" });
    });
});
//update a post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { owner, content, img } = req.body;
  const requestingUser = mongoose.Types.ObjectId(owner).toString();
  //JWT auth will go here
  User.findById(requestingUser).then(user => {
    const { isAdmin: adminIsUpdatingPost } = user;
    Post.findById(id).then( foundPost => {
      const { enabled: postIsEnabled, owner } = foundPost;
      const postOwner = owner.toString();
      const validUserIsUpdatingPost = postOwner === requestingUser;
      if (postIsEnabled) {
        if (validUserIsUpdatingPost || adminIsUpdatingPost) {
          Post.findByIdAndUpdate(
            id,
            { $set: { content: content, img: img } },
            { new: true }
          ).then(updatedPost => {
            res.status(200).json({ message: "You Updated A Post!", updatedPost: updatedPost });
          });
        } else {
          res.status(403).json({ message: "That action cannot be completed." });
        }
      } else {
        res.json({ message: "Post not found." });
      }
    });
  })
});
router.get("/", (req, res) => {});
//get timeline
router.get("/", (req, res) => {});
//like a post
router.put("/like/:id", (req, res) => {
  const { id } = req.params;
  const {owner: requestingUser} = req.body;
  //JWT stuff needs to go here
  Post.findById(id).then(post => {
    const { likes, _id } = post;
    if(likes.includes(requestingUser)){
      Post.findByIdAndUpdate(id, {$pull:{likes:requestingUser}}, {new:true}).then(unlikedPost => {
        console.log(unlikedPost);
        res.status(200).json({message:"UNLIKING"})
      })
    }else{
      console.log(post);
      Post.findByIdAndUpdate(_id, {$push:{likes:requestingUser}}, {new:true}).then(likedPost=> {
        console.log(likedPost);
        res.status(200).json({message:"LIKING"})
      })
    }
  })

});
//(DISABLES) a post
router.delete("/:id", (req, res) => {
  const { body } = req;
  const { owner } = body;
  const { id } = req.params;
  //jwt auth will go here
  const requestingUser = mongoose.Types.ObjectId(owner).toString();
  User.findById(requestingUser).then(user => {
    const {isAdmin: adminIsDeletingPost} = user;
    Post.findById(id).then(post => {
      const {owner, enabled} = post;
      const postOwner = owner.toString();
      const validUserIsDeletingPost = postOwner === requestingUser;
      if (validUserIsDeletingPost || adminIsDeletingPost) {
        if (enabled) {
          Post.findByIdAndUpdate(id, { $set: { enabled: false } })
            .then(data => {
              res.status(200).json({ message: "Post successfully deleted." });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json("An error occurred.");
            });
        } else {
          res.status(401).json({ message:"Post Not Found." });
        }
      } else {
        res.status(403).json({ message: "That action cannot be completed." });
      }
    });
  })

});
module.exports = router;
