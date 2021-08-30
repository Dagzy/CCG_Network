const { Schema, model } = require("mongoose");

const Deck = new Schema(
  {
    deckName: {
      type: String,
      min: 3,
      max: 30,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "cards",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
module.exports = model("deck", Deck);

//tests: make three cards, make a deck with those three cards and a user
