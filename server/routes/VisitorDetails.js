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

router.get('/test-set-cookie', (req, res) => {
  res.cookie('accessToken', 'test-token-value', {
    httpOnly: true,
    secure: false, 
    sameSite: 'strict',
  });
  res.send('Cookie has been set');
});

router.get('/test-get-cookie', (req, res) => {
  console.log("Cookies:", req.cookies);
  res.send('Check the console for cookies');
});



module.exports = router;
