const express = require('express');
const shopController=require('../controllers/shopcontroller')
const router = express.Router();
const multer=require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only images are allowed!'), false);
    }
};
const upload = multer({ storage, fileFilter });
router.post('/shopregister',shopController.registershop)
router.post('/shoplogin',shopController.loginshop)
router.get('/checkshopsession',shopController.checkshopsession)
router.post('/updateshop',shopController.updateshop)
router.post('/addground',upload.single('image'),shopController.addground)
router.get('/loadvenues',shopController.loadVenues)
module.exports = router;
