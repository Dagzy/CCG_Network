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
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Post Created!", postId:data._id });
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
  //JWT auth will go here
  Post.findById(id).then((post) => {
    if (post.enabled) {
      if (post.owner.toString() === mongoose.Types.ObjectId(owner).toString()) {
        Post.findByIdAndUpdate(
          id,
          { $set: { content: content, img: img } },
          { new: true }
        ).then((data) => {
          res.status(200).json({ message: "You Updated A Post!" });
        });
      } else {
        res.status(403).json({ message: "You can't perform that action." });
      }
    } else {
      res.json({ message: "Post not found." });
    }
  });
});
router.get("/", (req, res) => {});
//get timeline
router.get("/", (req, res) => {});
//like a post
router.put("/:id", (req, res) => {});
//(DISABLES) a post
router.delete("/:id", (req, res) => {
  const { body } = req;
  const { userId } = body;
  const { id } = req.params;
  //jwt auth will go here
  User.findById(userId).then(user => {
    Post.findById(id).then((post) => {
      console.log(user, post);
      if (post.owner.toString() === user._id.toString() || user.isAdmin) {
        console.log(post.owner.toString(), user._id.toString());
        if (post.enabled) {
          Post.findByIdAndUpdate(id, { $set: { enabled: false } })
            .then((data) => {
              res.status(200).json({ message: "Post successfully deleted." });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json("An error occurred.");
            });
        } else {
          res.send("Post Not Found.");
        }
      } else {
        res.status(403).json({ message: "You can't perform that action." });
      }
    });
  })

});
module.exports = router;
