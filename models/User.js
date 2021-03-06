const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 4,
      max: 25,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 30,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    decks:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"decks"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
