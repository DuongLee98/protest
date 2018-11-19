	var length = 0;
	class Qt
	{
		constructor(qt, slen, sarr, aw)
		{
			this.qt = qt;
			this.slen = slen;
			this.sarr = sarr;
			this.aw = aw;
		}
		render(i)
		{
			var rs = "";
			var p1 = '<div class="card-header">Question '+i+'</div><div class="card-body"><div class="form-group"><label class="col-sm-12 col-form-label">Question:</label><div class="col-sm-12"><textarea id="'+'Q'+i+'A'+'" name="qarr['+i+']" class="form-control" rows="5" placeholder="Enter your question">'+this.qt+'</textarea></div></div>'
			rs=p1;
			var p2 = "";
			for (var j=0; j<this.slen; j++)
			{
				if (j==this.aw)
				{
					p2+=this.getP2(i, j, true);
				}
				else
				{
					p2+=this.getP2(i, j, false);
				}
			}
			rs = p1+p2;
			return rs+'<div id="'+'Q'+i+'N'+'" class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group mr-0" role="group" aria-label="First group"><button type="button" onclick="DelQ('+i+')" class="btn btn-secondary">X</button><button type="button" onclick="UpQ('+i+')" class="btn btn-secondary"><a href="'+'#Q'+(i==0?length-1:i-1)+'">△</a></button><button onclick="DownQ('+i+')" type="button" class="btn btn-secondary"><a href="'+'#Q'+(i==length-1?0:i+1)+'">▽</a></button><button onclick="Add('+i+')" type="button" class="btn btn-secondary">Add</button><button onclick="Set('+i+')" type="button" class="btn btn-secondary">Set</button></div>';
		}
		getP2(vt, i, checked)
		{
			if (checked == true)
				return '<div id="'+'Q'+vt+'S'+i+'N'+'" class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group mr-0" role="group" aria-label="First group"><button onclick="Del('+vt+', '+i+')" type="button" class="btn btn-secondary">X</button><button type="button" onclick="Up('+vt+', '+i+')" class="btn btn-secondary">△</button><button onclick="Down('+vt+', '+i+')" type="button" class="btn btn-secondary">▽</button></div><div class="input-group col-sm-4"><input id="'+'Q'+vt+'S'+i+'" value="'+this.sarr[i]+'" type="text" class="form-control" placeholder="selection"></div><div class="form-check" name="0"><input name="aarr['+vt+']" onclick="Select('+vt+', '+i+')" value="'+i+'" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" checked></div><div class="input-group col-sm-5"><input id='+'Q'+vt+'S'+i+'O'+' name="sarr['+vt+']" type="text" class="form-control" value="'+this.sarr[i]+'" readonly="readonly"></div></div>'
			else
				return '<div id="'+'Q'+vt+'S'+i+'N'+'" class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group mr-0" role="group" aria-label="First group"><button onclick="Del('+vt+', '+i+')" type="button" class="btn btn-secondary">X</button><button type="button" onclick="Up('+vt+', '+i+')" class="btn btn-secondary">△</button><button onclick="Down('+vt+', '+i+')" type="button" class="btn btn-secondary">▽</button></div><div class="input-group col-sm-4"><input id="'+'Q'+vt+'S'+i+'" value="'+this.sarr[i]+'" type="text" class="form-control" placeholder="selection"></div><div class="form-check" name="0"><input name="aarr['+vt+']" onclick="Select('+vt+', '+i+')" value="'+i+'" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" ></div><div class="input-group col-sm-5"><input id='+'Q'+vt+'S'+i+'O'+' name="sarr['+vt+']" type="text" class="form-control" value="'+this.sarr[i]+'" readonly="readonly"></div></div>'
		}

	}
	var qarr = [];
	function setup()
	{
		document.getElementById("form").innerHTML = '';
		for (var i=0; i<length; i++)
		{
			document.getElementById("form").innerHTML += '<div id="'+'Q'+(i)+'" class="card mb-3">'+qarr[i].render(i)+'</div>'
		}

	}
	function Select(q, s)
	{
		qarr[q].aw = s;
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
	}
	function Set(q) {
		for (var i=0; i<qarr[q].slen; i++)
		{
			qarr[q].sarr[i] = document.getElementById('Q'+q+'S'+i).value;
			qarr[q].qt = document.getElementById('Q'+q+'A').value;
			document.getElementById('Q'+q+'S'+i+'O').value = qarr[q].sarr[i];
		}
	}
	function Add(q) {
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		qarr[q].sarr.push('');
		qarr[q].slen++;
		document.getElementById('Q'+q).innerHTML = qarr[q].render(q);
	}
	function Del(q, s)
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		qarr[q].sarr.splice(s, 1);
		qarr[q].slen--;
		document.getElementById('Q'+q).innerHTML = qarr[q].render(q);
	}
	function Up(q, s)
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		var n = s-1;
		if (n < 0)
		{
			n = qarr[q].slen-1;
		}
		let tmp = qarr[q].sarr[s];
		qarr[q].sarr[s] = qarr[q].sarr[n];
		qarr[q].sarr[n] = tmp;
		if (s == qarr[q].aw)
		{
			qarr[q].aw = n;
		}
		else if (n == qarr[q].aw)
		{
			qarr[q].aw = s;
		}
		document.getElementById('Q'+q).innerHTML = qarr[q].render(q);
	}
	function Down(q, s)
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		var n = s+1;
		if (n >= qarr[q].slen)
		{
			n = 0;
		}
		let tmp = qarr[q].sarr[s];
		qarr[q].sarr[s] = qarr[q].sarr[n];
		qarr[q].sarr[n] = tmp;
		if (s == qarr[q].aw)
		{
			qarr[q].aw = n;
		}
		else if (n == qarr[q].aw)
		{
			qarr[q].aw = s;
		}
		document.getElementById('Q'+q).innerHTML = qarr[q].render(q);
	}

	function AddQ()
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		var tmp = new Qt('', 1, [''], 0);
		qarr.push(tmp);
		length++;
		document.getElementById("form").innerHTML = '';
		for (var i=0; i<length; i++)
		{
			document.getElementById("form").innerHTML += '<div id="'+'Q'+(i)+'" class="card mb-3">'+qarr[i].render(i)+'</div>'
		}
	}

	function UpQ(q)
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		var n = q-1;
		if (n < 0)
		{
			n = length-1;
		}
		let tmp = qarr[q];
		qarr[q] = qarr[n];
		qarr[n] = tmp;
		document.getElementById("form").innerHTML = '';
		for (var i=0; i<length; i++)
			document.getElementById("form").innerHTML += '<div id="'+'Q'+(i)+'" class="card mb-3">'+qarr[i].render(i)+'</div>'
	}

	function DownQ(q)
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		var n = q+1;
		if (n >= length)
		{
			n = 0;
		}
		let tmp = qarr[q];
		qarr[q] = qarr[n];
		qarr[n] = tmp;
		document.getElementById("form").innerHTML = '';
		for (var i=0; i<length; i++)
			document.getElementById("form").innerHTML += '<div id="'+'Q'+(i)+'" class="card mb-3">'+qarr[i].render(i)+'</div>'
	}

	function DelQ(q)
	{
		for (var i=0; i<length; i++)
		{
			Set(i);
		}
		qarr.splice(q, 1);
		length--;
		document.getElementById("form").innerHTML = '';
		for (var i=0; i<length; i++)
		{
			document.getElementById("form").innerHTML += '<div id="'+'Q'+(i)+'" class="card mb-3">'+qarr[i].render(i)+'</div>';
		}
	}