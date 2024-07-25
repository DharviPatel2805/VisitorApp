const express = require("express");
const {
  createVisitorDrinks,
  listVisitorDrinks,
  getVisitorDrinks,
  updateVisitorDrinks,
  removeVisitorDrinks,
} = require("../controllers/VisitorDrinks");

const router = express.Router();

router.post("/auth/create/visitor-drinks", createVisitorDrinks);

router.get("/auth/list/visitor-drinks", listVisitorDrinks);

router.get("/auth/get/visitor-drinks/:_id", getVisitorDrinks);

router.put("/auth/update/visitor-drinks/:_id", updateVisitorDrinks);

router.delete("/auth/remove/visitor-drinks/:_id", removeVisitorDrinks);

module.exports = router;
