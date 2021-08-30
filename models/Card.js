const { Schema, model } = require("mongoose");
const CardSchema = new Schema(
  {
    card_name: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    foil: {
      type: Boolean,
      default: false,
      required: true,
    },
    sets: {
      type: Array,
      default: [],
    },
    art: {
      type: String,
      default: "",
    },
    oracle_rules: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = model("card", CardSchema);
