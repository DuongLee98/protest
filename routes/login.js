var express = require('express');
var webservice = require('../../protest/webservice');
var router = express.Router();

/* GET home page. */
router.route('/')
	.get(function(req, res, next) {
		res.render('login');
	})
	.post(async function(req, res, next) {
		data = {};
		data.user = req.body.user;
		data.pass = req.body.pass;

		try
		{
			var info = await webservice.login(res.locals, 'login', 'rlogin', data);
			if(info.cd == 0)
			{
				req.session.user = data.user
				req.session.lg = info.msg;
				req.session.login = true;
				req.session.pass = data.pass;
				if (info.msg == "teacher")
					return res.redirect('/users/t/'+data.user);
				if (info.msg == "student")
					return res.send(info)
			}
			else
			{
				res.render('login');
			}
		}
		catch(e)
		{
			res.send(e);
		}
		
	});

module.exports = router;