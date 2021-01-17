var express = require('express');
var router = express.Router();
const controller = require('./wheather-report.controller');

router.get('/cities', controller.getCities);
router.get('/measurements', controller.getMeasurements);

module.exports = router;