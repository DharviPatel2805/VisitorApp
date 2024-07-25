const express = require("express");
const {
  createDrink,
  listDrink,
  getDrink,
  updateDrink,
  removeDrink,
} = require("../controllers/Drinks");

const router = express.Router();

router.post("/auth/create/drink", createDrink);

router.get("/auth/list/drink", listDrink);

router.get("/auth/get/drink/:_id", getDrink);

router.put("/auth/update/drink/:_id", updateDrink);

router.delete("/auth/remove/drink/:_id", removeDrink);

module.exports = router;
