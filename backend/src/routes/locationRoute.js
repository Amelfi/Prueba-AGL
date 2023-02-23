const express = require('express')
const { showLocation, showSpeedLimit } = require('../controllers/locationController');
const router = express.Router()


router.get('/location', showSpeedLimit);
router.post('/location', showLocation);


module.exports = router;