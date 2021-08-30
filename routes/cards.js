const router = require("express").Router();
const Card = require("../models/Card");

router.get("/", (req, res) => {
    res.json({message:"Getting Cards"});
});
router.post("/", (req, res)=>{
    console.log(req.body);
    res.json({message:"Posting Card"})
})
module.exports = router;

