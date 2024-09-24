const express = require('express');
const Admincontroller = require('../controllers/admincontroller');
const router = express.Router();

router.get('/checksession',Admincontroller.checksession)
router.post('/adminverify',Admincontroller.adminverify)
router.post('/deleteground',Admincontroller.admindeleteground)
router.post('/deleteuser',Admincontroller.admindeleteuser)
module.exports = router;
