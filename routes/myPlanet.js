var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
	// var id = req.session.user.id;
	request(config.server + 'demo/?service=Post.GetMyGroupPost&id=' +  req.param("userid"),
		function(error, response, body) {
			if (error) {
				next(error);
			} else {
				if (response.statusCode == 200) {
					var result = JSON.parse(body);
					if(result.ret==200&&result.msg==""){
						res.render('myPlanet/' + req.param("userid"),result.data);
					}
				}

			}
		})
});
// router.get('/', function(req, res, next) {
// 	var id = req.session.user.id;
// 	request('http://104.194.79.57/demo/?service=Post.GetMyGroupPost&id=' + id,
// 		function(error, response, body) {
// 			if (error) {
// 				next(error);
// 			} else {
// 				if (response.statusCode == 200) {
// 					var result = JSON.parse(body);
// 					if(result.ret==200&&result.msg==""){
// 						res.render('/myPlant/1',result.data);
// 					}
// 				}

// 			}
// 		})
// });
module.exports = router;