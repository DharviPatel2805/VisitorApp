const express = require("express");
const {
  createVisitorDetails,
  listVisitorDetails,
  getVisitorDetails,
  updateVisitorDetails,
  removeVisitorDetails,
} = require("../controllers/VisitorDetails");

const router = express.Router();

router.post("/auth/create/visitor-details", createVisitorDetails);

router.get("/auth/list/visitor-details", listVisitorDetails);

router.get("/auth/get/visitor-details/:_id", getVisitorDetails);

router.put("/auth/update/visitor-details/:_id", updateVisitorDetails);

router.delete("/auth/remove/visitor-details/:_id", removeVisitorDetails);

module.exports = router;
