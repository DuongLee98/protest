function showPage() {
	document.getElementById("load").style.display = "none";
	document.getElementById("check_mark").style.display = "none";
	document.getElementById("myDiv").style.display = "block";
}
function loadPage()
{
	document.getElementById("load").style.display = "block";
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("check_mark").style.display = "none";
}
function Success()
{
	document.getElementById("load").style.display = "none";
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("check_mark").style.display = "block";
}

function timeConvertor(time)
	{
	    var PM = time.match('PM') ? true : false
	    
	    time = time.split(':')
	    var min = time[2]
	    
	    if (PM) {
	        var hour = 12 + parseInt(time[1],10)
	        var sec = time[3].replace('PM', '')
	    } else {
	        var hour = time[1]
	        var sec = time[3].replace('AM', '')       
	    }
	    return hour + ':' + min
	}
	function dateConvertor(date)
	{
		date = date.replace('/', '-')
		date = date.replace('/', '-')
		return date;
	}

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