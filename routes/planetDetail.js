var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET users listing. */
router.get('/:groupid', function(req, res, next) {
	request(config.server + "demo/?service=Post.GetGroupPost&group_id=" + req.param("groupid"),
		function(error, response, body) {
			if (!error) {
				console.log('Planet Detail List Success:OK');
				var result = JSON.parse(body);
				console.log(result);
				if (result.ret == 200 && result.msg == "") {

					//res.render('planetDetail', result.data);
					res.render('planetDetail/' + req.param("groupid"), result.data);
				}
			} else {
				console.error('PlanetAll failed:', err);
				next(error);
			}
		})
});

module.exports = router;