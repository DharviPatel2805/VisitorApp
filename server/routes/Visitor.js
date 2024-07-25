const express = require("express");
const {
  createVisitor,
  listVisitor,
  getVisitor,
  updateVisitor,
  removeVisitor,
} = require("../controllers/Visitor");

const router = express.Router();

router.post("/auth/create/visitor", createVisitor);

router.get("/auth/list/visitor", listVisitor);

router.get("/auth/get/visitor/:_id", getVisitor);

router.put("/auth/update/visitor/:_id", updateVisitor);

router.delete("/auth/remove/visitor/:_id", removeVisitor);

module.exports = router;
