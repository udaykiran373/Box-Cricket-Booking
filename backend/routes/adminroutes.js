const express = require('express');
const Admincontroller = require('../controllers/admincontroller');
const router = express.Router();

router.get('/checksession',Admincontroller.checksession)
router.post('/adminverify',Admincontroller.adminverify)
router.post('/deleteground',Admincontroller.admindeleteground)
router.post('/deleteuser',Admincontroller.admindeleteuser)
router.post('/fixpercentage',Admincontroller.fixpercentage)
router.get('/getpercentage',Admincontroller.getpercentage)
router.get('/checkrevenue',Admincontroller.checkRevenue)
module.exports = router;
