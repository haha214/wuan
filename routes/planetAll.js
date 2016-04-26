var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var ua = require('mobile-agent');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var agent = ua(req.headers['user-agent']);
	request(config.server + "demo/?service=Group.Lists",function(error, response, body) {
			if (!error) {
				console.log('Planet Success:OK');
				var result = JSON.parse(body);
				if (result.ret == 200 && result.msg == "") {
					res.render('planetAll', {'result':result.data,'ag': agent});
				}
			} else {
				console.error('PlanetAll failed:', err);
				next(error);
			}
		})
});
// router.get('/:page', function(req, res, next) {
// 	request("http://104.194.79.57/demo/?service=Group.Lists?page=" + req.param("page"),
// 		function(error, response, body) {
// 			if (!error) {
// 				console.log('Plant Success:OK');
// 				var result = JSON.parse(body);
// 				if (result.ret == 200 && result.msg == "") {
// 					res.render('plantAll', result.data);
// 				}
// 			} else {
// 				console.error('PlantAll failed:', err);
// 				next(error);
// 			}
// 		})
// });
module.exports = router;