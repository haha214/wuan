var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	request(config.server + "?service=Post.GetPostBase&post_id=" + req.param('id') ,
		function(err, response, body) {
			if (!err && response.statusCode == 200) {
				var result = JSON.parse(body);
				if (result.ret == 200 && result.msg == "") {
					res.render('postDetail/' + req.param('id'), result.data);
				} else {
					console.error('post failed:', err);
					next();
				}
			}
		});
});

module.exports = router;