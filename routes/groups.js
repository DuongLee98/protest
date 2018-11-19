var express = require('express');
var webservice = require('../../protest/webservice');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	return res.redirect('/login');
});
router.get('/:gid', async function(req, res, next){
	var data = req.params;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	var ws = {};
	ws.idgroup = data.gid;
	var info = await webservice.getInfoOfGroup(res.locals, 'getInfoOfGroup', 'rgetInfoOfGroup', ws);
	if (info.cd == 0)
	{
		res.render('group', info.data);
	}
	else
	{
		res.send(info);
	}
})

router.get('/:gid/exam', async function(req, res, next){
	var data = req.params;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	var ws = {};
	ws.gid = data.gid;
	var info = await webservice.getInfoAllExamAcceptForGroup(res.locals, 'getInfoAllExamAcceptForGroup', 'rgetInfoAllExamAcceptForGroup', ws);
	if (info.cd == 0)
	{
		res.render('glistexam', info.data);
		// res.send(info);
	}
	else
	{
		res.send(info);
	}
})

module.exports = router;