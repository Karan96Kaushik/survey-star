const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Questions = new Schema(
  {
    type:String,
    text:String,
    options:Array,
    fileLocation:String,
    isRandom:Boolean


    // addedBy: {
    //   required:true,
    //   type:mongoose.Schema.Types.ObjectId
    // }
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "updateTime" },
    collection: "Questions",
  }
);

module.exports = {
  Questions: mongoose.model("Questions", Questions),
};
