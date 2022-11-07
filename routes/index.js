var express = require('express');
var router = express.Router();
const { parseDates, parseTotalDuration, generateRoute, prepareData } = require("../services/otherFunctions");
const savedData = require("../public/result.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/result', function(req, res, next) {
  let data = savedData;

  let impData = prepareData(data);

  console.log(impData[0]);
  
  res.render('result', { impData });
});


module.exports = router;
