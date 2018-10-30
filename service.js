var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let student = require('./ManageStudent');
let teacher = require('./ManageTeacher');
let group = require('./ManageGroup');
var config = require('./config');

let log = config.log

var userList = {};
var socketList = {};

http.listen(3000, "0.0.0.0", function() {
    log('(Server) Listening to port:  ' + 3000);
});

ID = {};
LG = {};

io.on('connection', function(clientSocket){
    log('(Client) connected: '+ clientSocket.id);

    ID[clientSocket.id] = clientSocket.id;
    LG[clientSocket.id] = "none";

    login(clientSocket, 'login', 'rlogin')
    regs(clientSocket, 'regs', 'rreg')
    regt(clientSocket, 'regt', 'rreg')
    createGroupByTeacher(clientSocket, 'createGroupByTeacher', 'rcreateGroupByTeacher');
    getInfoAllGroupTeacherManage(clientSocket, 'getInfoAllGroupTeacherManage', 'rgetInfoAllGroupTeacherManage');
    deleteGroupByTeacher(clientSocket, 'deleteGroupByTeacher', 'rdeleteGroupByTeacher');
    editGroupByTeacher(clientSocket, 'editGroupByTeacher', 'reditGroupByTeacher');
    searchInfo(clientSocket, 'searchInfo', 'rsearchInfo');

    clientSocket.on('disconnect', function(){
        log('(Client) disconnected: '+ clientSocket.id);
        delete ID[clientSocket.id];
        delete LG[clientSocket.id];
    });
                   
});



function login(socket, keyin, keyout)
{
	socket.on(keyin, async function(data){
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		var user = data.user
		var pass = data.pass
		let exists = await student.userExist(user);
		let existt = await teacher.userExist(user);
		if (exists == true && existt == false)
		{
			let ppass = await student.getPassUser(user);
			if (pass == ppass)
			{
				ID[socket.id] = user;
				LG[socket.id] = "student";
				log('(Server) '+socket.id+'->'+user+" - student");
				ddata = {};
				ddata.name = await student.getNameUser(user);
				ddata.phone = await student.getPhoneUser(user);
				socket.emit(keyout, success(ddata, "student"))
				log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
			}
			else
			{
				var msg = "Password doesn't correct"
				socket.emit(keyout, error(msg))
				log('(Server) '+socket.id+"<-"+keyout+": "+msg)
			}
		}
		else if (exists == false && existt == true)
		{
			let ppass = await teacher.getPassUser(user);
			if (pass == ppass)
			{
				ID[socket.id] = user;
				LG[socket.id] = "teacher";
				log('(Server) '+socket.id+'->'+user+" - teacher");
				ddata = {};
				ddata.name = await teacher.getNameUser(user);
				ddata.phone = await teacher.getPhoneUser(user);
				ddata.cmnd = await teacher.getIcUser(user);
				socket.emit(keyout, success(ddata, "teacher"))
				log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
			}
			else
			{
				var msg = "Password doesn't correct"
				socket.emit(keyout, error(msg))
				log('(Server) '+socket.id+"<-"+keyout+": "+msg)
			}
		}
		else if (exists == false && existt == false)
		{
			var msg = "User doesn't correct"
			socket.emit(keyout, error(msg))
			log('(Server) '+socket.id+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Error System!"
			socket.emit(keyout, error(msg))
			log('(Server) '+socket.id+"<-"+keyout+": "+msg)
		}
	})
}

function regs(socket, keyin, keyout)
{
	socket.on(keyin, async function(data){
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		var user = data.user
		var pass = data.pass
		var phone = data.phone
		var name = data.name

		let exists = await student.userExist(user)
		let existt = await teacher.userExist(user)
		if (exists || existt)
		{
			var msg = "Username exist"
			socket.emit(keyout, error(msg))
			log('(Server) '+socket.id+"<-"+keyout+": "+msg)
		}
		else
		{
			try
			{
				let reg = await student.addUser(user, pass, name, phone)
				var tx = config.infoTransaction(reg);
				if (reg.status == true)
				{
					socket.emit(keyout, success({}, "student reg success"))
					log('(Server) '+socket.id+'<-'+keyout+": "+JSON.stringify({}));
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
				else
				{
					var msg = 'Student reg false'
					socket.emit(keyout, error(msg))
					log('(Server) '+socket.id+"<-"+keyout+": "+msg)
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
			}
			catch(e)
			{
				var msg = 'Error System!'
				socket.emit(keyout, error(msg))
				log('(Server) '+socket.id+"<-"+keyout+": "+msg)
				log('(Block ) transaction error: '+e)
			}
		}
	})
}

function regt(socket, keyin, keyout)
{
	socket.on(keyin, async function(data){
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		var user = data.user
		var pass = data.pass
		var phone = data.phone
		var name = data.name
		var cmnd = data.cmnd 

		let exists = await student.userExist(user)
		let existt = await teacher.userExist(user)
		if (exists || existt)
		{
			var msg = "Username exist"
			socket.emit(keyout, error(msg))
			log('(Server) '+socket.id+"<-"+keyout+": "+msg)
		}
		else
		{
			try
			{
				let reg = await teacher.addUser(user, pass, name, phone, cmnd)
				var tx = config.infoTransaction(reg);
				if (reg.status == true)
				{
					socket.emit(keyout, success({}, "teacher reg success"))
					log('(Server) '+socket.id+'<-'+keyout+": "+JSON.stringify({}));
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
				else
				{
					var msg = 'teacher reg false'
					socket.emit(keyout, error(msg))
					log('(Server) '+socket.id+"<-"+keyout+": "+msg)
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
			}
			catch(e)
			{
				var msg = 'Error System!'
				socket.emit(keyout, error(msg))
				log('(Server) '+socket.id+"<-"+keyout+": "+msg)
				log('(Block ) transaction error: '+e)
			}
		}
	})
}

function createGroupByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "teacher")
		{
			var namegroup = data.namegroup;
			var userteacher = data.userteacher;

			let existGroup = await group.existGroup(namegroup);
			if (existGroup == false)
			{
				try
				{
					let addGroup = await group.addGroup(namegroup);
					var tx = config.infoTransaction(addGroup);
					if (tx.status == true)
					{
						log('(Block ) transaction info: '+JSON.stringify(tx))
						try
						{
							let idgroup = await group.getGid(namegroup);
							let existGroupManage = await group.groupExistManage(idgroup);
							if (existGroupManage == false)
							{
								try
								{
									let addManage = await group.addManage(userteacher, idgroup);
									var tx = config.infoTransaction(addManage);
									if (tx.status == true)
									{
										var ddata = {};
										ddata.namegroup = namegroup;
										ddata.userteacher = userteacher;
										ddata.idgroup = idgroup;
										socket.emit(keyout, success(ddata, "create Group success"))
										log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
										log('(Block ) transaction info: '+JSON.stringify(tx))
									}
									else
									{
										var msg = 'create Group false'
										socket.emit(keyout, error(msg))
										log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
										log('(Block ) transaction info: '+JSON.stringify(tx))

										group.deleteGroup(idgroup).then(function (edata){
											log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(edata)));
										})
									}
								}
								catch (e)
								{
									var msg = 'Error System!'
									socket.emit(keyout, error(msg))
									log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
									log('(Block ) transaction error: '+e)

									group.deleteGroup(idgroup).then(function (edata){
										log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(edata)));
									})
								}
							}
							else
							{
								var msg = 'Group managed by other teacher'
								socket.emit(keyout, error(msg))
								log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
								log('(Block ) transaction info: '+JSON.stringify(tx))

								group.deleteGroup(idgroup).then(function (edata){
									log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(edata)));
								})
							}
						}
						catch(e)
						{
							var msg = e;
							socket.emit(keyout, error(msg))
							log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
							log('(Block ) info: '+e)

							group.deleteGroup(idgroup).then(function (edata){
								log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(edata)));
							})
						}

					}
					else
					{
						var msg = 'addGroup false'
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
						log('(Block ) transaction info: '+JSON.stringify(tx))
					}
				}
				catch(e)
				{
					var msg = 'Error System!'
					socket.emit(keyout, error(msg))
					log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
					log('(Block ) transaction error: '+e)
				}
			}
			else
			{
				var msg = "Group exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else if (LG[socket.id] == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you create group";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoAllGroupTeacherManage(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] != "none")
		{
			try
			{
				var userteacher = data.userteacher;
				let ddata = await group.getInfoAllGroupTeacherManage(userteacher)
				socket.emit(keyout, success(ddata, "get success"))
				log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function deleteGroupByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "teacher")
		{
			var idgroup = data.idgroup;
			var userteacher = data.userteacher;
			try
			{
				let namegroup = await group.getNameGroup(idgroup);
				let status = await group.getStatusManage(userteacher, idgroup)
				if (status == true)
				{
					try
					{
						let deleteManage = await group.deleteManage(userteacher, idgroup);
						var tx = config.infoTransaction(deleteManage);
						if (tx.status == true)
						{
							log('(Block ) transaction info: '+JSON.stringify(tx))
							try
							{
								let deleteGroup = await group.deleteGroup(idgroup);
								var tx = config.infoTransaction(deleteGroup);
								if (tx.status == true)
								{
									
									var ddata = {};
									socket.emit(keyout, success(ddata, "delete Group success"))
									log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
								}
								else
								{
									var msg = 'delete Group false'
									socket.emit(keyout, error(msg))
									log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
							}
							catch (e)
							{
								var msg = 'Error System!'
								socket.emit(keyout, error(msg))
								log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
								log('(Block ) transaction error: '+e)
							}
							
						}
						else
						{
							var msg = 'delete Group false'
							socket.emit(keyout, error(msg))
							log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
					}
					catch (e)
					{
						var msg = 'Error System!'
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
						log('(Block ) transaction error: '+e)
					}
				}
				else
				{
					var msg = "You does'n manage "+namegroup;
					socket.emit(keyout, error(msg))
					log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
				}
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else if (LG[socket.id] == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you delete group";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function editGroupByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "teacher")
		{
			var idgroup = data.idgroup;
			var userteacher = data.userteacher;
			var newname = data.newname;
			try
			{
				let namegroup = await group.getNameGroup(idgroup);
				let status = await group.getStatusManage(userteacher, idgroup)
				if (status == true)
				{
					try
					{
						let editGroup = await group.editGroup(idgroup, newname);
						var tx = config.infoTransaction(editGroup);
						if (tx.status == true)
						{
							var ddata = {};
							socket.emit(keyout, success(ddata, "edit Group success"))
							log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
						else
						{
							var msg = 'eidt Group false'
							socket.emit(keyout, error(msg))
							log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
					}
					catch (e)
					{
						var msg = 'Error System!'
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
						log('(Block ) transaction error: '+e)
					}
				}
				else
				{
					var msg = "You does'n manage "+namegroup;
					socket.emit(keyout, error(msg))
					log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
				}
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else if (LG[socket.id] == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you delete group";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function searchInfo(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		if (LG[socket.id] != "none")
		{
			try
			{
				var lenout = 0;
				var arrout = [];
				utype = data.utype;
				infosearch = data.infosearch;
				if (data.utype == "student" || data.utype == "all")
				{
					let dataStudent = await student.getInfoAllStudent();
					var len = dataStudent.len;
					var arr = dataStudent.arr;
					for (var i = 0; i<len; i++)
					{
						var dataToString = JSON.stringify(arr[i])
						if (dataToString.indexOf(infosearch) != -1)
						{
							arrout.push(arr[i]);
							lenout++;
						}
					}
				}
				if (data.utype == "teacher" || data.utype == "all")
				{
					let dataTeacher = await teacher.getInfoAllTeacher();
					var len = dataTeacher.len;
					var arr = dataTeacher.arr;
					for (var i = 0; i<len; i++)
					{
						var dataToString = JSON.stringify(arr[i])
						if (dataToString.indexOf(infosearch) != -1)
						{
							arrout.push(arr[i]);
							lenout++;
						}
					}
				}
				dataout = {};
				dataout.len = lenout;
				dataout.arr = arrout;
				socket.emit(keyout, success(dataout));
				log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(dataout));
			}
			catch(e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you delete group";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	})
}

function success(data, msg)
{
	let rptrue = {};
	rptrue.cd = 0;
	rptrue.data = data;
	rptrue.msg = msg
	return rptrue;
}

function error(msg)
{
	let rpfalse = {};
	rpfalse.cd = 1;
	rpfalse.msg = msg;
	return rpfalse
}