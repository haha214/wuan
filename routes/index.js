var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var ua = require('mobile-agent');
/* GET home page. */
router.get('/', function(req, res, next) {
	var agent = ua(req.headers['user-agent']);
	request(config.server + '?service=Post.GetIndexPost', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body)); // Show the HTML for the Google homepage. 
			var data = JSON.parse(body);
			if (data.ret == 200) {
				res.render('index', { 'result': data.data, 'ag': agent });
			}
		} else {
			// res.status(err.status || 500);
			// res.render('error', {
			// 	message: response.statusCode + '/n服务器忙，请稍后再试！',
			// 	error: {}
			// });
			console.error('Error:', error);
			next();
		}
	})

});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// var request = require('request');
// var ua = require('mobile-agent');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//     var agent = ua(req.headers['user-agent']);
// 	request('http://104.194.79.57/?service=Post.GetIndexPost', function(error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 			console.log(JSON.parse(body)); // Show the HTML for the Google homepage. 
// 			var data = JSON.parse(body);
// 			if (data.ret == 200) {
//                 res.render('index', { 'result': data.data, 'ag': agent });
// 			}
// 		} else {
// //			res.status(err.status || 500);
// //			res.render('error', {
// //				message: response.statusCode + '/n服务器忙，请稍后再试！',
// //				error: {}
// //			});
// 			next(error);
// 		}
// 	})

// });

// module.exports = router;