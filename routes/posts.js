const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/", (req, res) => {
  const { body } = req;
  const p = new Post(body);
  p.save()
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Post Created!" });
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
    if (post.owner.toString() === mongoose.Types.ObjectId(owner).toString()) {
      Post.findByIdAndUpdate(
        id,
        { $set: { content: content, img: img } },
        { new: true }
      ).then((data) => {
        res.status(200).json({ message: "You Updated A Post!" });
      });
    } else {
      res.status(403).json({ message: "You may only update your own posts." });
    }
  });
});
router.get("/", (req, res) => {});
//get timeline
router.get("/", (req, res) => {});
//like a post
router.put("/", (req, res) => {});
//(DISABLES) a post
router.delete("/:id", (req, res) => {
  const { body } = req;
  const { userId, isAdmin } = body;
  const { id } = req.params;
  //jwt auth will go here
  Post.findById(id).then(post => {
        console.log(userId);
        console.log(post.owner.toString());
        if(post.owner.toString() === userId){
            console.log("firing");
            res.send("Worked")
        }
    })
});
module.exports = router;
