const express = require("express")
const router = express.Router();
const MembershipController = require('../Controllers/membership');
const auth = require('../Auth/auth');

router.post('/add-membership',auth,MembershipController.addmembership);
router.get('/get-membership',auth,MembershipController.getmembership);

module.exports = router; 