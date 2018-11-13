var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let student = require('./ManageStudent');
let teacher = require('./ManageTeacher');
let group = require('./ManageGroup');
let exam = require('./ManageExam');
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

    //teacher
    login(clientSocket, 'login', 'rlogin')
    regs(clientSocket, 'regs', 'rreg')
    regt(clientSocket, 'regt', 'rreg')
    createGroupByTeacher(clientSocket, 'createGroupByTeacher', 'rcreateGroupByTeacher');
    getInfoAllGroupTeacherManage(clientSocket, 'getInfoAllGroupTeacherManage', 'rgetInfoAllGroupTeacherManage');
    deleteGroupByTeacher(clientSocket, 'deleteGroupByTeacher', 'rdeleteGroupByTeacher');
    editGroupByTeacher(clientSocket, 'editGroupByTeacher', 'reditGroupByTeacher');
    searchInfo(clientSocket, 'searchInfo', 'rsearchInfo');
    getInfoOfGroup(clientSocket, 'getInfoOfGroup', 'rgetInfoOfGroup');
    groupAddOrInviteStudentByTeacher(clientSocket, 'groupAddOrInviteStudentByTeacher', 'rgroupAddOrInviteStudentByTeacher');
    groupDeleteOrRefuseStudentByTeacher(clientSocket, 'groupDeleteOrRefuseStudentByTeacher', 'rgroupDeleteOrRefuseStudentByTeacher');

    getInfoOfStudent(clientSocket, 'getInfoOfStudent', 'rgetInfoOfStudent');
    studentJoinOrAcceptGroup(clientSocket, 'studentJoinOrAcceptGroup', 'rstudentJoinOrAcceptGroup')
    studentExitOrRefuseGroup(clientSocket, 'studentExitOrRefuseGroup', 'rstudentExitOrRefuseGroup')
    getInfoOfTeacher(clientSocket, 'getInfoOfTeacher', 'rgetInfoOfTeacher');

    //Student
    getInfoAllGroupStudentJoin(clientSocket, 'getInfoAllGroupStudentJoin', 'rgetInfoAllGroupStudentJoin');
    //Exam
    getExam(clientSocket, 'getExam', 'rgetExam');
    getInfoAllExamTeacherMake(clientSocket, 'getInfoAllExamTeacherMake', 'rgetInfoAllExamTeacherMake');
    
    clientSocket.on('disconnect', function(){
        log('(Client) disconnected: '+ ID[clientSocket.id]+"-"+LG[clientSocket.id]) ;
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
								var tx = await group.deleteAllStudentOfGroup(idgroup);
								
								if (tx.status == true)
								{
									let deleteGroup = await group.deleteGroup(idgroup);
									var ddata = config.infoTransaction(deleteGroup);
									if (ddata.status == true)
									{

										socket.emit(keyout, success({}, "delete Group success"))
										log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
									}
									else
									{
										var msg = 'delete Group false'
										socket.emit(keyout, error(msg))
										log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
										log('(Block ) transaction info: '+JSON.stringify(ddata))
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
			var msg = "Must login before you edit group";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function searchInfo(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
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
							arr[i].type = "student"
							arrout.push(arr[i]);
							lenout++;
							if (lenout >= 5)
								break;
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
							arr[i].type = "teacher"
							arrout.push(arr[i]);
							lenout++;
							if (lenout >= 5)
								break;
						}
					}
				}
				if (data.utype == "group" || data.utype == "all")
				{
					let dataGroup = await group.getInfoAllGroup();
					var len = dataGroup.len;
					var arr = dataGroup.arr;
					for (var i = 0; i<len; i++)
					{
						try
						{
							arr[i].tname = await teacher.getNameUser(arr[i].tuser);
							var dataToString = JSON.stringify(arr[i])
							if (dataToString.indexOf(infosearch) != -1)
							{
								arr[i].type = "group"
								arrout.push(arr[i]);
								lenout++;
								if (lenout >= 5)
									break;
							}
						}
						catch (e)
						{

						}
						
					}
				}
				dataout = {};
				dataout.len = lenout;
				dataout.arr = arrout;
				socket.emit(keyout, success(dataout, "success"));
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
			var msg = "Must login before you search";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	})
}

function getInfoOfGroup(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		if (LG[socket.id] != "none")
		{
			var idg = data.idgroup;
			let existGroup = await group.existIdGroup(idg)
			if (existGroup == true)
			{
				try
				{
					let tuser = await group.getTeacherOfGroup(idg);
					let tname = await teacher.getNameUser(tuser);
					let allstudent = await group.getAllStudentOfGroup(idg);
					let len = allstudent.len;
					let arruser = allstudent.arr;
					var arr = [];
					for (var i = 0; i<len; i++)
					{
						var info = {};
						info.user = arruser[i];
						let namestudent = await student.getNameUser(info.user);
						let status = await group.getStatus(arruser[i], idg);
						info.name = namestudent;
						info.status = status;
						arr.push(info);
					}
					ddata = {};
					ddata.tuser = tuser;
					ddata.tname = tname;
					ddata.len = len;
					ddata.arr = arr;
					socket.emit(keyout, success(ddata, "success"));
					log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
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
				var msg = "Group doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info group";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	})
}

function groupAddOrInviteStudentByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "teacher")
		{
			var idgroup = data.idgroup;
			var tuser = data.tuser;
			var suser = data.suser;
			try
			{
				let namegroup = await group.getNameGroup(idgroup);
				let statusM = await group.getStatusManage(tuser, idgroup)
				if (statusM == true)
				{
					let existS = await student.userExist(suser);
					if (existS == true)
					{
						let status = await group.getStatus(suser, idgroup);
						if (status != 1 && status != 3)
						{
							try
							{
								let addStudent = await group.groupAddUser(idgroup, suser);
								var tx = config.infoTransaction(addStudent);
								if (tx.status == true)
								{
									var ddata = {};
									socket.emit(keyout, success(ddata, "add Student success"))
									log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
								else
								{
									var msg = 'add Student false'
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
							var msg = "Student is already in group";
							socket.emit(keyout, error(msg))
							log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
						}
					}
					else
					{
						var msg = "Student doesn't exist";
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
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
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function groupDeleteOrRefuseStudentByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "teacher")
		{
			var idgroup = data.idgroup;
			var tuser = data.tuser;
			var suser = data.suser;
			try
			{
				let namegroup = await group.getNameGroup(idgroup);
				let statusM = await group.getStatusManage(tuser, idgroup)
				if (statusM == true)
				{
					let existS = await student.userExist(suser);
					if (existS == true)
					{
						let status = await group.getStatus(suser, idgroup);
						if (status != 0 && status != 5)
						{
							try
							{
								let deleteStudent = await group.groupRefuseUser(idgroup, suser);
								var tx = config.infoTransaction(deleteStudent);
								if (tx.status == true)
								{
									var ddata = {};
									socket.emit(keyout, success(ddata, "delete Student success"))
									log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
								else
								{
									var msg = 'delete Student false'
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
							var msg = "student doesn't in group"
							socket.emit(keyout, error(msg))
							log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
						}
					}
					else
					{
						var msg = "Student doesn't exist";
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
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
			var msg = "Must login before you DeleteOrRefuseStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoOfStudent(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		if (LG[socket.id] != "none")
		{
			var suser = data.suser;
			let existStudent = await student.userExist(suser)
			if (existStudent == true)
			{
				try
				{
					let infostudent = await student.getInfoStudent(suser);
					
					socket.emit(keyout, success(infostudent, "success"));
					log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(infostudent));
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
				var msg = "Student doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info student";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	})
}

function getInfoAllGroupStudentJoin(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] != "none")
		{
			try
			{
				var suser = data.suser;
				let ddata = await group.getInfoAllGroupStudentJoin(suser)
				for (var i = 0; i<ddata.len; i++)
				{
					ddata.arr[i].tname = await teacher.getNameUser(ddata.arr[i].tuser);
				}
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

function studentJoinOrAcceptGroup(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "student")
		{
			var idgroup = data.idgroup;
			var suser = data.suser;

			try
			{
				let existG = await group.existIdGroup(idgroup);
				let existS = await student.userExist(suser);
				
				if (existS == true && existG == true)
				{
					let status = await group.getStatus(suser, idgroup)
					if (status != 1 && status != 2)
					{
						try
						{
							let joinGroup = await group.userJoinGroup(suser, idgroup);
							var tx = config.infoTransaction(joinGroup);
							if (tx.status == true)
							{
								var ddata = {};
								socket.emit(keyout, success(ddata, "join group success"))
								log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
								log('(Block ) transaction info: '+JSON.stringify(tx))
							}
							else
							{
								var msg = 'join group failse'
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
						var msg = "User is already in group";
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
					}
				}
				else
				{
					var msg = "student or Group doesn't exist"
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
		else if (LG[socket.id] == "teacher")
		{
			var msg = "You're a teacher, not a student";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function studentExitOrRefuseGroup(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] == "student")
		{
			var idgroup = data.idgroup;
			var suser = data.suser;

			try
			{
				let existG = await group.existIdGroup(idgroup);
				let existS = await student.userExist(suser);
				
				if (existS == true && existG == true)
				{
					let status = await group.getStatus(suser, idgroup)
					if (status != 0 && status != 4)
					{
						try
						{
							let refuseGroup = await group.userRefuseGroup(suser, idgroup);
							var tx = config.infoTransaction(refuseGroup);
							if (tx.status == true)
							{
								var ddata = {};
								socket.emit(keyout, success(ddata, "exit group success"))
								log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(ddata));
								log('(Block ) transaction info: '+JSON.stringify(tx))
							}
							else
							{
								var msg = 'exit group failse'
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
						var msg = "User doesn't in group";
						socket.emit(keyout, error(msg))
						log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
					}
				}
				else
				{
					var msg = "student or Group doesn't exist"
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
		else if (LG[socket.id] == "teacher")
		{
			var msg = "You're a teacher, not a student";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoOfTeacher(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		if (LG[socket.id] != "none")
		{
			var tuser = data.tuser;
			let existTeacher = await teacher.userExist(tuser)
			if (existTeacher == true)
			{
				try
				{
					let infoteacher = await teacher.getInfoTeacher(tuser);
					
					socket.emit(keyout, success(infoteacher, "success"));
					log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(infoteacher));
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
				var msg = "Teacher doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	})
}

function getExam(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+socket.id+'->'+keyin+': '+JSON.stringify(data))
		if (LG[socket.id] != "none")
		{
			var eid = data.eid;
			let existExam = await exam.getExistId(eid)
			if (existExam == true)
			{
				try
				{
					let dataExam = await exam.getExam(eid);
					dataExam.tname = await teacher.getNameUser(dataExam.tuser);
					if(dataExam.publish == false)
					{
						let dataGroup = await group.getInfoAllGroupTeacherManage(dataExam.tuser);
						let lenGroupAcc = 0;
						let arrGourpAcc = [];
						for (var i = 0; i<dataGroup.len; i++)
						{
							var st = await exam.getAcceptGroupForExam(dataExam.tuser, eid, parseInt(dataGroup.arr[i].gid));
							if (st==true)
							{
								lenGroupAcc++;
								arrGourpAcc.push(parseInt(dataGroup.arr[i].gid));
							}
						}
						dataExam.lenGroupAcc = lenGroupAcc;
						dataExam.arrGourpAcc = arrGourpAcc;
					}
					
					socket.emit(keyout, success(dataExam, "success"));
					log('(Server) '+ID[socket.id]+'<-'+keyout+": "+JSON.stringify(dataExam));
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
				var msg = "Exam doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get exam";
			socket.emit(keyout, error(msg))
			log('(Server) '+ID[socket.id]+"<-"+keyout+": "+msg)
		}
	})
}

function getInfoAllExamTeacherMake(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+ID[socket.id]+'->'+keyin+': '+JSON.stringify(data));
		if (LG[socket.id] != "none")
		{
			try
			{
				var tuser = data.tuser;
				let ddata = await exam.getInfoAllExamTeacherMake(tuser)
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