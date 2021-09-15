const { Schema, model } = require("mongoose");

const Post = new Schema(
  {
    content: {
      type: String,
      max: 255,
    },
    img: {
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
module.exports = model("posts", Post);

