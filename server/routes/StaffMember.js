const express = require("express");
const { createStaffMember, listStaffMember, getStaffMember, updateStaffMember, removeStaffMember } = require("../controllers/StaffMember");

const router = express.Router();

router.post("/auth/create/staff-member", createStaffMember);

router.get("/auth/list/staff-member", listStaffMember);

router.get("/auth/get/staff-member/:_id", getStaffMember);

router.put("/auth/update/staff-member/:_id", updateStaffMember);

router.delete("/auth/remove/staff-member/:_id", removeStaffMember);

module.exports = router;
