var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
	.get(function(req, res, next) {
		res.render('test')
	})
	.post(function(req, res, next) {

		res.send(req.body.firstname);
	});

router.get('/:eid/', function(req, res, next) {
	// res.send(req.params);
	res.render('test');
});

module.exports = router;