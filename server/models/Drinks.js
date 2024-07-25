// Name,
// Image,
// serve member_id
const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const DrinkSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Image: {
        type: String,
    },
    // serve_member_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: "StaffMember",
    //     required: true,
    // },
},
  { timestamps: true }
);

module.exports = mongoose.model("Drink", DrinkSchema);