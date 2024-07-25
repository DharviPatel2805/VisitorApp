// name, 
// image, 
// email, 
// mobile


const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const StaffMemberSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Image: {
        type: String,
    },
    MobileNo: {
      type: String,
    },
    Email: {
      type: String,
      required: true,
    },
},
  { timestamps: true }
);

module.exports = mongoose.model("StaffMember", StaffMemberSchema);