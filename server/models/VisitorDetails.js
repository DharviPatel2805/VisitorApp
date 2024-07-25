// staff_member_id,
// Visitor_id,
// Reason,
// State,
// visiting datetime on confining visiting,
// notification should be send to Staff member through SmS Confirm

const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const VisitorDetailsSchema = new mongoose.Schema(
  {
    staff_member_id: [{
      type: Schema.Types.ObjectId,
      ref: "StaffMember",
      required: true,
    }],
    visitor_id: {
        type: Schema.Types.ObjectId,
        ref: "Visitor",
        required: true,
      },
    reason: {
      type: String,
      // required: true,
    },
    // drinkState: {
    //     type: Boolean,    //YES, DELIVERD, NO
    //     required: true,
    //     default: false,
    //   },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisitorDetails", VisitorDetailsSchema);
