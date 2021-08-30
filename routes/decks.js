const router = require("express").Router();
const Card = require("../models/Card");
const Deck = require("../models/Deck");
const User = require("../models/User");
router.get("/:id", (req, res)=>{
    console.log(req.params);
    res.json({message:"Getting Decks"});
});
router.post("/:id", (req, res)=>{
    console.log(req.params);
    res.json({message:"Posting Decks"});
});
router.put("/:id", (req, res)=>{
    console.log(req.params);
    res.json({message:"Putting Decks"});
});
router.delete("/:id/:deckId", (req, res)=>{
    console.log(req.params);
    res.json({message:"Deleting Decks"});
});
module.exports = router;


// {
//     card_name: "Black Lotus",
//     colors: ["colorless"],
//     foil: false,
//     sets: ["alpha", "beta"]
//   }
// {
//     card_name: "Dark Ritual",
//     colors: ["black"],
//     foil: false,
//     sets: ["alpha", "beta"]
//   }
// {
//     card_name: "Force Of Will",
//     colors: ["blue"],
//     foil: false,
//     sets: ["alliances"]
//   }





// new Card({
//     card_name: "Dark Ritual",
//     colors: ["black"],
//     foil: false,
//     sets: ["alpha", "beta"]
//   }).save().then(console.log)

//WHOAMG, THIS IS THE QUERY @_@;;;
// const d = new Deck(  {
//     deckName: "testing",
//     cards: ["612c4380e7740392ce42a3f3", "612c4380e7740392ce42a3f3", "612c4380e7740392ce42a3f3", "612c436d082c299b29a0cccf", "612c435544e926caae509730"],
//     owner: "612c43467b6aca8802213ddd"
//   },)
// console.log(d); 
// d.save().then(data => {
//     console.log(data._id);
//     User.findOneAndUpdate({_id:"612c43467b6aca8802213ddd"}, {$push:{decks:data._id}}, {new:true}).then(console.log).catch(console.log)
// })