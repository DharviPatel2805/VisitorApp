const express = require("express");
const {
  createVisitorDetails,
  listVisitorDetails,
  getVisitorDetails,
  updateVisitorDetails,
  removeVisitorDetails,
} = require("../controllers/VisitorDetails");
const {verifyToken} = require("../middlewares/auth");

const router = express.Router();

router.post("/auth/create/visitor-detail", verifyToken, createVisitorDetails);

router.get("/auth/list/visitor-detail", listVisitorDetails);

router.get("/auth/get/visitor-detail/:_id", getVisitorDetails);

router.put("/auth/update/visitor-detail/:_id", updateVisitorDetails);

router.delete("/auth/remove/visitor-detail/:_id", removeVisitorDetails);

module.exports = router;
