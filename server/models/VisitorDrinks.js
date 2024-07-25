// Fields: visitor_id
// Drink_id,
// State,
// serve datetime

const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const VistorDrinksSchema = new mongoose.Schema(
  {
    visitor_id: {
        type: Schema.Types.ObjectId,
        ref: "Visitor",
        required: true,
      },
      drink_id: {
        type: Schema.Types.ObjectId,
        ref: "Drink",
        required: true,
      },
      drinkState: {
        type: Boolean,    //YES, DELIVERD, NO
        required: true,
        default: false,
      },
},
  { timestamps: true }
);

module.exports = mongoose.model("VisitorDrink", VistorDrinksSchema);