var express = require('express');
var router = express.Router();

let incomingData = 0;

router.get('/', function(req, res, next) {
  if(req.query.d !== undefined) {
    incomingData = req.query.d;
    res.send("Success!");
  }
  else {
  	res.json({
      'data': incomingData
  	});
  }
});

router.post('/', function(req, res, next) {
  incomingData = req.body.data;
  res.send('Good!');
})

module.exports = router;
