var express = require('express');
var webservice = require('../../protest/webservice');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	return res.redirect('/login');
});

router.get('/:eid(\\d+)', async function(req, res, next){
	var data = req.params;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	var ws = {};
	ws.eid = data.eid;
	// res.render('exam')
	var info = {};
	info.data = {};
	info.data.skuser = res.locals.user;
	info.data.skpass = res.locals.pass;
	info.data.eid = data.eid;
	res.render('exam', info.data);
})

router.get('/:eid(\\d+)/edit', async function(req, res, next){
	var data = req.params;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	var ws = {};
	ws.eid = data.eid;
	// res.render('exam')
	var info = {};
	info.data = {};
	info.data.skuser = res.locals.user;
	info.data.skpass = res.locals.pass;
	info.data.eid = data.eid;
	res.render('exam', info.data);
})

router.get('/create', async function(req, res, next){
	var data = req.params;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	res.render('create', res.locals);
})

function standardized(time)
{
	var DaT = time.split('T');
	var D = DaT[0].split('-');
	var T = getTime(tConvert(DaT[1]+":00"));
	return D[0]+'/'+D[1]+'/'+D[2]+'-'+T;
}

function tConvert (time) {
	// Check correct time format and split into components
	time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	if (time.length > 1) { // If time format correct
		time = time.slice (1);  // Remove full string match value
		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join (''); // return adjusted time or original string
}

function getTime(d)
{
	let time = d.split(' ');
	let stamp = time[0].split(':');
	const hour = stamp[0].length > 1 ? stamp[0] : '0'+stamp[0];
	const minute = stamp[1].length > 1 ? stamp[1] : '0'+stamp[1];
	const second = stamp[2].length > 1 ? stamp[2] : '0'+stamp[2];
    return time[1]+':'+hour+':'+minute+':'+second;
}

module.exports = router;