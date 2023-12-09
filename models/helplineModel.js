const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const helplineSchema = new mongoose.Schema(
  {
   
    user: {
      type: ObjectId,
      ref: "User",
      
    },
    // status verified or not
    stt: {
      type: String,
      default: false,
    },
    // issue name
    issue: {
      type: String,
      trim: true,
     
    },
    // name of the institute
    agen: {
      type: String,
      trim: true,
      
    },
    // Unique Id of the Institute
    uid: {
      type: String,
      trim: true,
    },
    // locatoin of the institute
    map: {
      type: String,
      trim: true,
      required: [true, "location is required"],
    },

    // phone number
    num: {
      type: String,
      trim: true,
    
    },
    //  support type
    sup: {
      type: String,
      default: true,
    },

    // description
    des: {
      type: String,
      trim: true,
      
    },

    //language
    lan: {
        type: String,
        trim: true,
      },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Helpline", helplineSchema);