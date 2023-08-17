const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Responses = new Schema(
  {
    // _questionID: {
    //   required:true,
    //   type:mongoose.Schema.Types.ObjectId
    // },

    fileRef:String,
    response:String,
    multiResponse:Array,

    // text:String,
    // options:Array,
    // fileLocation:String,
    // isRandom:Boolean


    // addedBy: {
    //   required:true,
    //   type:mongoose.Schema.Types.ObjectId
    // }

  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "updateTime" },
    collection: "Responses",
  }
);

module.exports = {
  Responses: mongoose.model("Responses", Responses),
};
