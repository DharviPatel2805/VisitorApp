// Name
// Mobile
// address 
// sign in datetime

const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const VisitorSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    MobileNo: {
      type: String,
      // required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", VisitorSchema);
