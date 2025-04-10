const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../../controllers/imageController');
const flash = require('express-flash');
const Trip = require('../../models/tripModels');
const upload = multer({
  storage: imageController.storage,
  fileFilter: imageController.imageFilter
});


//read

//read a single trip

//create a single trip

//update a single trip

//delete a single trip


module.exports = router;