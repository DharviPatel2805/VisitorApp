const express = require("express");
const {
  createVisitor,
  listVisitor,
  getVisitor,
  updateVisitor,
  removeVisitor,
  getNewToken,
} = require("../controllers/Visitor");

const router = express.Router();

router.post("/create/visitor", createVisitor);

router.get("/auth/list/visitor", listVisitor);

router.get("/auth/get/visitor/:_id", getVisitor);

router.put("/auth/update/visitor/:_id", updateVisitor);

router.delete("/auth/remove/visitor/:_id", removeVisitor);

router.get('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully.' });
});


module.exports = router;
