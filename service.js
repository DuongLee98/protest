var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
let account = require('./ManageAccount');
let group = require('./ManageGroup');
let exam = require('./ManageExam');
var config = require('./config');

let log = config.log

var userList = {};
var socketList = {};

http.listen(3005, "0.0.0.0", function() {
    log('(Server) Listening to port:  ' + 3005);
});

SK = {};

io.on('connection', function(clientSocket){
    log('(Client) connected: '+ clientSocket.id);
    SK[clientSocket.id] = {};
    SK[clientSocket.id].user = clientSocket.id;
    SK[clientSocket.id].type = "none";

    //Teacher
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

    //Student
    getInfoOfStudent(clientSocket, 'getInfoOfStudent', 'rgetInfoOfStudent');
    studentJoinOrAcceptGroup(clientSocket, 'studentJoinOrAcceptGroup', 'rstudentJoinOrAcceptGroup')
    studentExitOrRefuseGroup(clientSocket, 'studentExitOrRefuseGroup', 'rstudentExitOrRefuseGroup')
    getInfoOfTeacher(clientSocket, 'getInfoOfTeacher', 'rgetInfoOfTeacher');
    getInfoAllGroupStudentJoin(clientSocket, 'getInfoAllGroupStudentJoin', 'rgetInfoAllGroupStudentJoin');

    //Exam
    getExam(clientSocket, 'getExam', 'rgetExam');
    getInfoAllExamTeacherMake(clientSocket, 'getInfoAllExamTeacherMake', 'rgetInfoAllExamTeacherMake');
    getInfoAllExamAcceptForGroup(clientSocket, 'getInfoAllExamAcceptForGroup', 'rgetInfoAllExamAcceptForGroup')
    getTimeStamp(clientSocket, 'getTimeStamp', 'rgetTimeStamp');
    setExam(clientSocket, 'setExam', 'rsetExam');
    setGeneralExam(clientSocket, 'setGeneralExam', 'rsetGeneralExam');
    setAcceptListGroupForExam(clientSocket, 'setAcceptListGroupForExam', 'rsetAcceptListGroupForExam')
    makeExamByTeacher(clientSocket, 'makeExamByTeacher', 'rmakeExamByTeacher')
    autoMask(clientSocket, 'autoMask', 'rautoMask');
    
    clientSocket.on('disconnect', function(){
        log('(Client) disconnected: '+ SK[clientSocket.id].user+"-"+SK[clientSocket.id].type) ;
        delete SK[clientSocket.id];
    });   
});



function login(socket, keyin, keyout)
{
	socket.on(keyin, async function(data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		var user = data.user
		var pass = data.pass
		let exists = await account.userSExist(user);
		let existt = await account.userTExist(user);
		if (exists == true || existt == true)
		{
			let info = await account.login(user, pass);
			if (info.login == true)
			{
				SK[socket.id].user = user;
				SK[socket.id].type = info.type;
				SK[socket.id].pass = pass;
				SK[socket.id].code = info.code;
				log('(Server) '+socket.id+'->'+user+" - "+SK[socket.id].type);
				ddata = {};
				if (SK[socket.id].code == 0)
				{
					ddata.name = await account.getNameSUser(user);
					ddata.phone = await account.getPhoneSUser(user);
					socket.emit(keyout, success(ddata, SK[socket.id].type));
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
				}
				else if (SK[socket.id].code == 1)
				{
					ddata.name = await account.getNameTUser(user);
					ddata.phone = await account.getPhoneTUser(user);
					data.cmnd = await account.getIcTUser(user);
					socket.emit(keyout, success(ddata, SK[socket.id].type));
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
				}
				else
				{
					var msg = "User undefined";
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
				
				
			}
			else
			{
				var msg = "Password doesn't correct"
				socket.emit(keyout, error(msg))
				log('(Server) '+socket.id+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "User doesn't correct"
			socket.emit(keyout, error(msg))
			log('(Server) '+socket.id+"<-"+keyout+": "+msg)
		}
	})
}

function regs(socket, keyin, keyout)
{
	socket.on(keyin, async function(data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		var user = data.user
		var pass = data.pass
		var phone = data.phone
		var name = data.name

		let exists = await account.userSExist(user)
		let existt = await account.userTExist(user)
		if (exists || existt)
		{
			var msg = "Username exist"
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			try
			{
				let reg = await account.regStudent(user, pass, name, phone)
				var tx = config.infoTransaction(reg);
				if (reg.status == true)
				{
					socket.emit(keyout, success({}, "student reg success"))
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify({}));
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
				else
				{
					var msg = 'Student reg false'
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
			}
			catch(e)
			{
				var msg = 'Error!'
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
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

		let exists = await account.userSExist(user)
		let existt = await account.userTExist(user)
		if (exists || existt)
		{
			var msg = "Username exist"
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			try
			{
				let reg = await account.regTeacher(user, pass, name, phone, cmnd)
				var tx = config.infoTransaction(reg);
				if (reg.status == true)
				{
					socket.emit(keyout, success({}, "teacher reg success"))
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify({}));
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
				else
				{
					var msg = 'Teacher reg false'
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					log('(Block ) transaction info: '+JSON.stringify(tx))
				}
			}
			catch(e)
			{
				var msg = 'Error!'
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				log('(Block ) transaction error: '+e)
			}
		}
	})
}

function createGroupByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "teacher")
		{
			var gname = data.namegroup;
			var tuser = data.userteacher;

			if (SK[socket.id].user == tuser)
			{
				let existGroup = await group.existNameGroup(gname);
				if (existGroup == false)
				{
					try
					{
						let reg = await group.createGroupByTeacher(tuser, SK[socket.id].pass, gname);
						var tx = config.infoTransaction(reg);
						if (reg.status == true)
						{
							var ddata = {};
							ddata.namegroup = gname;
							ddata.userteacher = tuser;
							ddata.idgroup = await group.getIdNameGroup(gname);
							socket.emit(keyout, success(ddata, "create Group success"))
							log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify({}));
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
						else
						{
							var msg = 'create group reg false'
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
					}
					catch(e)
					{
						var msg = 'Error System!'
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						log('(Block ) transaction error: '+e)
					}
				}
				else
				{
					var msg = "Group exist";
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You aren't "+ tuser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}	
		}
		else if (SK[socket.id].type == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you create group";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoAllGroupTeacherManage(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type != "none")
		{
			try
			{
				var userteacher = data.userteacher;
				let ddata = await group.getInfoAllGroupTeacherManage(userteacher)
				if (userteacher == SK[socket.id].user)
					ddata.control = true;
				else
					ddata.control = false;
				socket.emit(keyout, success(ddata, "get success"))
				log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function deleteGroupByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "teacher")
		{
			var gid = data.idgroup;
			var tuser = data.userteacher;
			if (SK[socket.id].user == tuser)
			{
				try
				{
					let status = await group.getStatusTeacherGroup(tuser, gid)
					let existGroup = await group.existIdGroup(gid);
					if (status == true && existGroup == true)
					{
						let deleteGroup = await group.deleteGroupByTeacher(tuser, SK[socket.id].pass, gid);
						var ddata = config.infoTransaction(deleteGroup);
						if (ddata.status == true)
						{
							socket.emit(keyout, success({}, "delete Group success"))
							log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
						}
						else
						{
							var msg = 'delete Group false'
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
							log('(Block ) transaction info: '+JSON.stringify(ddata))
						}
					}
					else
					{
						var msg = "You does'n manage "+gid +" or dosen't exist";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch (e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You aren't "+tuser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}	
		}
		else if (LG[socket.id] == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you delete group";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function editGroupByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "teacher")
		{
			var gid = data.idgroup;
			var tuser = data.userteacher;
			var newname = data.newname;
			if (tuser == SK[socket.id].user)
			{
				try
				{
					let existGroup = await group.existIdGroup(gid);
					let status = await group.getStatusTeacherGroup(tuser, gid);
					if (status == true)
					{
						try
						{
							let editGroup = await group.editGroupByTeacher(tuser, SK[socket.id].pass, gid, newname);
							var tx = config.infoTransaction(editGroup);
							if (tx.status == true)
							{
								var ddata = {};
								socket.emit(keyout, success(ddata, "edit Group success"))
								log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
								log('(Block ) transaction info: '+JSON.stringify(tx))
							}
							else
							{
								var msg = 'eidt Group false'
								socket.emit(keyout, error(msg))
								log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
								log('(Block ) transaction info: '+JSON.stringify(tx))
							}
						}
						catch (e)
						{
							var msg = 'Error System!'
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
							log('(Block ) transaction error: '+e)
						}
					}
					else
					{
						var msg = "You does'n manage "+gid+" or doesn't existGroup";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch (e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You aren't "+tuser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else if (SK[socket.id].type == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you edit group";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function searchInfo(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].type != "none")
		{
			try
			{
				var lenout = 0;
				var arrout = [];
				utype = data.utype;
				infosearch = data.infosearch;
				if (data.utype == "student" || data.utype == "all")
				{
					let dataStudent = await account.getInfoAllStudent();
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
					let dataTeacher = await account.getInfoAllTeacher();
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
							arr[i].tname = await account.getNameTUser(arr[i].tuser);
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
				log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(dataout));
			}
			catch(e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you search";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function getInfoOfGroup(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].type != "none")
		{
			var gid = data.idgroup;
			let existGroup = await group.existIdGroup(gid)
			if (existGroup == true)
			{
				try
				{
					let tuser = await group.getTeacherManage(gid);
					let tname = await account.getNameTUser(tuser);
					let allstudent = await group.getAllStudentOfGroup(gid);
					let len = allstudent.len;
					let arruser = allstudent.arr;
					var arr = [];
					for (var i = 0; i<len; i++)
					{
						var info = {};
						info.user = arruser[i];
						let namestudent = await account.getNameSUser(info.user);
						let status = await group.getStatusGroupStudent(arruser[i], gid);
						info.name = namestudent;
						info.status = status;
						arr.push(info);
					}
					ddata = {};
					ddata.tuser = tuser;
					ddata.tname = tname;
					ddata.gid = parseInt(gid);
					ddata.gname = await group.getNameGroup(gid);
					ddata.len = len;
					ddata.arr = arr;
					if (tuser == SK[socket.id].user)
						ddata.control = true;
					else
						ddata.control = false;
					socket.emit(keyout, success(ddata, "success"));
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Group doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info group";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function groupAddOrInviteStudentByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "teacher")
		{
			var gid = data.idgroup;
			var tuser = data.tuser;
			var suser = data.suser;
			if (tuser == SK[socket.id].user)
			{
				try
				{
					let existGroup = await group.existIdGroup(gid);
					let statusM = await group.getStatusTeacherGroup(tuser, gid)
					if (statusM == true && existGroup == true)
					{
						let existS = await account.userSExist(suser);
						if (existS == true)
						{
							let status = await group.getStatusGroupStudent(suser, gid);
							if (status != 1 && status != 3)
							{
								try
								{
									let addStudent = await group.groupAddOrInviteStudentByTeacher(tuser, SK[socket.id].pass, gid, suser);
									var tx = config.infoTransaction(addStudent);
									if (tx.status == true)
									{
										var ddata = {};
										socket.emit(keyout, success(ddata, "add Student success"))
										log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
										log('(Block ) transaction info: '+JSON.stringify(tx))
									}
									else
									{
										var msg = 'add Student false'
										socket.emit(keyout, error(msg))
										log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
										log('(Block ) transaction info: '+JSON.stringify(tx))
									}
								}
								catch (e)
								{
									var msg = 'Error System!'
									socket.emit(keyout, error(msg))
									log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
									log('(Block ) transaction error: '+e)
								}
							}
							else
							{
								var msg = "Student is already in group";
								socket.emit(keyout, error(msg))
								log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
							}
						}
						else
						{
							var msg = "Student doesn't exist";
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						}
					}
					else
					{
						var msg = "You does'n manage "+gid+" or group doesn't exist";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch (e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You aren't "+tuser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}	
		}
		else if (SK[socket.id].type == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function groupDeleteOrRefuseStudentByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "teacher")
		{
			var gid = data.idgroup;
			var tuser = data.tuser;
			var suser = data.suser;
			if (tuser == SK[socket.id].user)
			{
				try
				{
					let existGroup = await group.existIdGroup(gid);
					let statusM = await group.getStatusTeacherGroup(tuser, gid)
					if (statusM == true && existGroup == true)
					{
						let existS = await account.userSExist(suser);
						if (existS == true)
						{
							let status = await group.getStatusGroupStudent(suser, gid);
							if (status != 0 && status != 5)
							{
								try
								{
									let addStudent = await group.groupDeleteOrRefuseStudentByTeacher(tuser, SK[socket.id].pass, gid, suser);
									var tx = config.infoTransaction(addStudent);
									if (tx.status == true)
									{
										var ddata = {};
										socket.emit(keyout, success(ddata, "delete Student success"))
										log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
										log('(Block ) transaction info: '+JSON.stringify(tx))
									}
									else
									{
										var msg = 'delete Student false'
										socket.emit(keyout, error(msg))
										log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
										log('(Block ) transaction info: '+JSON.stringify(tx))
									}
								}
								catch (e)
								{
									var msg = 'Error System!'
									socket.emit(keyout, error(msg))
									log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
									log('(Block ) transaction error: '+e)
								}
							}
							else
							{
								var msg = "Student doesn't in group";
								socket.emit(keyout, error(msg))
								log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
							}
						}
						else
						{
							var msg = "Student doesn't exist";
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						}
					}
					else
					{
						var msg = "You does'n manage "+gid+" or group doesn't exist";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch (e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You aren't "+tuser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}	
		}
		else if (SK[socket.id].type == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoOfStudent(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].type != "none")
		{
			var suser = data.suser;
			let existStudent = await account.userSExist(suser)
			if (existStudent == true)
			{
				try
				{
					let infostudent = await account.getInfoStudent(suser);
					
					socket.emit(keyout, success(infostudent, "success"));
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(infostudent));
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Student doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info student";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function getInfoAllGroupStudentJoin(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type != "none")
		{
			try
			{
				var suser = data.suser;
				let ddata = await group.getInfoAllGroupStudentJoin(suser)
				for (var i = 0; i<ddata.len; i++)
				{
					ddata.arr[i].tname = await account.getNameTUser(ddata.arr[i].tuser);
				}
				if (suser == SK[socket.id].user)
						ddata.control = true;
					else
						ddata.control = false;
				socket.emit(keyout, success(ddata, "get success"))
				log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function studentJoinOrAcceptGroup(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "student")
		{
			var gid = data.idgroup;
			var suser = data.suser;
			if (suser == SK[socket.id].user)
			{
				try
				{
					let existG = await group.existIdGroup(gid);
					let existS = await account.userSExist(suser);
					
					if (existS == true && existG == true)
					{
						let status = await group.getStatusGroupStudent(suser, gid)
						if (status != 1 && status != 2)
						{
							try
							{
								let joinGroup = await group.studentJoinOrAcceptGroup(suser, SK[socket.id].pass, gid);
								var tx = config.infoTransaction(joinGroup);
								if (tx.status == true)
								{
									var ddata = {};
									socket.emit(keyout, success(ddata, "join group success"))
									log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
								else
								{
									var msg = 'join group failse'
									socket.emit(keyout, error(msg))
									log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
							}
							catch (e)
							{
								var msg = 'Error System!'
								socket.emit(keyout, error(msg))
								log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
								log('(Block ) transaction error: '+e)
							}
						}
						else
						{
							var msg = "User is already in group";
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						}
					}
					else
					{
						var msg = "student or Group doesn't exist"
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch (e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You're not "+suser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else if (SK[socket.id].type == "teacher")
		{
			var msg = "You're a teacher, not a student";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function studentExitOrRefuseGroup(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "student")
		{
			var gid = data.idgroup;
			var suser = data.suser;
			if (suser == SK[socket.id].user)
			{
				try
				{
					let existG = await group.existIdGroup(gid);
					let existS = await account.userSExist(suser);
					
					if (existS == true && existG == true)
					{
						let status = await group.getStatusGroupStudent(suser, gid)
						if (status != 0 && status != 4)
						{
							try
							{
								let exitGroup = await group.studentExitOrRefuseGroup(suser, SK[socket.id].pass, gid);
								var tx = config.infoTransaction(exitGroup);
								if (tx.status == true)
								{
									var ddata = {};
									socket.emit(keyout, success(ddata, "exit group success"))
									log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
								else
								{
									var msg = 'exit group failse'
									socket.emit(keyout, error(msg))
									log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
									log('(Block ) transaction info: '+JSON.stringify(tx))
								}
							}
							catch (e)
							{
								var msg = 'Error System!'
								socket.emit(keyout, error(msg))
								log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
								log('(Block ) transaction error: '+e)
							}
						}
						else
						{
							var msg = "User doesn't in group";
							socket.emit(keyout, error(msg))
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						}
					}
					else
					{
						var msg = "student or Group doesn't exist"
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch (e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You're not "+suser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else if (SK[socket.id].type == "teacher")
		{
			var msg = "You're a teacher, not a student";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you AddOrInviteStudent";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoOfTeacher(socket, keyin, keyout)
{
	socket.on(keyin,async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].type != "none")
		{
			var tuser = data.tuser;
			let existTeacher = await account.userTExist(tuser)
			if (existTeacher == true)
			{
				try
				{
					let infoteacher = await account.getInfoTeacher(tuser);
					
					socket.emit(keyout, success(infoteacher, "success"));
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(infoteacher));
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Teacher doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function getExam(socket, keyin, keyout)
{
	var load = 0;
	socket.on(keyin,async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].type != "none")
		{
			var eid = data.eid;
			let existExam = await exam.existIdExam(eid)
			socket.emit(keyout+'load', load+=16)
			if (existExam == true)
			{
				try
				{
					let dataExam = await exam.getExam(SK[socket.id].user, SK[socket.id].pass, eid);
					socket.emit(keyout+'load', load+=16)
					dataExam.tname = await account.getNameTUser(dataExam.tuser);
					socket.emit(keyout+'load', load+=16)
					if (dataExam.tuser == SK[socket.id].user)
					{
						dataAnswer = {};
						socket.emit(keyout+'load', load+=16)
						dataExam.alen = await exam.getLengthAnswerOfExam(eid);
						dataExam.aarr = await exam.getAllAnswerOfExam(dataExam.tuser, SK[socket.id].pass, eid);
					}
					if(dataExam.publish == false)
					{
						let dataGroup = await group.getInfoAllGroupTeacherManage(dataExam.tuser);
						socket.emit(keyout+'load', load+=16)
						let lenGroupAcc = 0;
						let arrGourpAcc = [];
						for (var i = 0; i<dataGroup.len; i++)
						{
							var st = await exam.getAcceptGroupForExam(dataExam.tuser, eid, parseInt(dataGroup.arr[i].gid));
							socket.emit(keyout+'load', load+=16)
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
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(dataExam));
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Exam doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get exam";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function setExam(socket, keyin, keyout)
{
	var load = 0.0;
	socket.on(keyin, async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].user != "none")
		{
			var eid = data.eid;
			var tuser = data.tuser
			let existExam = await exam.existIdExam(eid)
			socket.emit(keyout+'load', (load+=0.1)+'/'+data.qlen)
			if (existExam == true)
			{
				try
				{
					let teacheruser = await exam.getTeacherExam(eid);
					socket.emit(keyout+'load', (load+=0.1)+'/'+data.qlen)

					if (teacheruser == SK[socket.id].user)
					{
						var dt = data;
						for (var i=0; i<dt.qlen; i++)
						{
							setQ = await exam.addOrSetQuestionOfExam(tuser, SK[socket.id].pass, eid, i, dt.qarr[i].q);
							socket.emit(keyout+'load', (load+=1.0)+'/'+data.qlen)
							log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setQ)))
							for (var j=0; j<dt.qarr[i].slen; j++)
							{
								setS = await exam.addOrSetSelectionOfQuestionInExam(tuser, SK[socket.id].pass, eid, i, j, dt.qarr[i].sarr[j]);
								socket.emit(keyout+'load', (load+=0.2)+'/'+data.qlen)
								log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setS)))
							}
							setLS = await exam.setLengthSelectionOfQuestionInExam(tuser, SK[socket.id].pass, eid, i, dt.qarr[i].slen);
							socket.emit(keyout+'load', (load+=0.2)+'/'+data.qlen)
							log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setLS)));
						}
						setA = await exam.addOrSetAllAnswerOfExam(tuser, SK[socket.id].pass, eid, dt.aarr);
						socket.emit(keyout+'load', (load+=0.2)+'/'+data.qlen)
						log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setA)));
						setLA = await exam.setLengthAnswerOfExam(tuser, SK[socket.id].pass, eid, dt.qlen);

						socket.emit(keyout+'load', (load+=0.2)+'/'+data.qlen)
						log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setLA)));
						setLQ = await exam.setLengthQuestionOfExam(tuser, SK[socket.id].pass, eid, dt.qlen);
						socket.emit(keyout+'load', (load+=0.2)+'/'+data.qlen)
						log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setLQ)));

						socket.emit(keyout, success({}, "success"));
						log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify({}));
					}
					else
					{
						var msg = "you doen't own exam";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Exam doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
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

function setGeneralExam(socket, keyin, keyout)
{
	var load = 0.0;
	socket.on(keyin, async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data))
		if (SK[socket.id].type != "none")
		{
			var eid = data.eid;
			var tuser = data.tuser
			let existExam = await exam.existIdExam(eid)
			socket.emit(keyout+'load', (load+=0.1)+'/'+5)
			if (existExam == true)
			{
				try
				{
					let teacheruser = await exam.getTeacherExam(eid);
					let namexam = await exam.getNameOfExam(eid);
					socket.emit(keyout+'load', (load+=0.1)+'/'+5)

					if (teacheruser == SK[socket.id].user && tuser == teacheruser)
					{
						var dt = data;
						if (dt.ename != undefined && dt.ename != namexam)
						{
							setLA = await exam.editName(tuser, SK[socket.id].pass ,eid, dt.ename);
							socket.emit(keyout+'load', (load+=0.1)+'/'+5)
							log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setLA)));
							socket.emit(keyout+'load', (load+=1.0)+'/'+5)
						}

						setLQ = await exam.setGeneralExam(tuser, SK[socket.id].pass, eid, dt.timestart, dt.timeend, dt.type, dt.publish);
						socket.emit(keyout+'load', (load+=1.0)+'/'+5)
						log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setLQ)));


						socket.emit(keyout, success({}, "success"));
						log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify({}));
					}
					else
					{
						var msg = "you doen't own exam";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Exam doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get exam";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function setAcceptListGroupForExam(socket, keyin, keyout)
{
	var load = 0.0;
	socket.on(keyin, async function (data)
	{
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+data.eid + " " + data.tuser + " arr")
		if (SK[socket.id].type != "none")
		{
			var eid = data.eid;
			var tuser = data.tuser
			let existExam = await exam.existIdExam(eid)
			socket.emit(keyout+'load', (load+=0.1)+'/'+data.len)
			if (existExam == true)
			{
				try
				{
					let teacheruser = await exam.getTeacherExam(eid);
					socket.emit(keyout+'load', (load+=0.1)+'/'+data.len)

					if (teacheruser == SK[socket.id].user)
					{
						var dt = data;

						var AllGroup = await group.getInfoAllGroupTeacherManage(tuser);
						socket.emit(keyout+'load', (load+=0.1)+'/'+data.len)
						var garr = [];
						var barr = [];
						for (var i=0; i<AllGroup.len; i++)
						{
							garr.push(AllGroup.arr[i].gid);
							barr.push(dt.arr[AllGroup.arr[i].gid]);
							
							socket.emit(keyout+'load', (load+=1.0)+'/'+data.len)
							
						}
						setLQ = await exam.setAllAcceptGroupForExam(tuser, SK[socket.id].pass, eid, garr, barr);
						log('(Block ) transaction info: '+JSON.stringify(config.infoTransaction(setLQ)));
						socket.emit(keyout, success({}, "success"));
						log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify({}));
					}
					else
					{
						var msg = "you doen't own exam";
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
					}
				}
				catch(e)
				{
					var msg = e;
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "Exam doesn't exist";
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get exam";
			socket.emit(keyout, error(msg))
			log('(Server) '+Sk[socket.id].user+"<-"+keyout+": "+msg)
		}
	})
}

function getInfoAllExamTeacherMake(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type != "none")
		{
			try
			{
				var tuser = data.tuser;
				var exist = await account.userTExist(tuser);
				if (exist == true)
				{
					let ddata = await exam.getInfoAllExamTeacherMake(tuser)
					socket.emit(keyout, success(ddata, "get success"))
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
				}
				else
				{
					var msg = "tuser doesn't exist";
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}	
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function getInfoAllExamAcceptForGroup(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type != "none")
		{
			try
			{
				var gid = data.gid;
				var exist = await group.existIdGroup(gid);
				if (exist == true)
				{
					let tuser = await group.getTeacherManage(gid);
					let tname = await account.getNameTUser(tuser);
					let edata = await exam.getInfoAllExamTeacherMake(tuser);
					let len = 0;
					let arr = [];
					for (var i=0; i<edata.len; i++)
					{
						var edt = edata.arr[i];
						if (edt.publish == false)
						{
							var pl = await exam.getAcceptGroupForExam(tuser, edt.eid, gid);
							if (pl == true)
							{
								len++;
								arr.push(edt);
							}
						}
					}
					ddata = {};
					ddata.gid = gid;
					ddata.tuser = tuser;
					ddata.tname = tname;
					ddata.len = len;
					ddata.arr = arr;
					socket.emit(keyout, success(ddata, "get success"))
					log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
				}
				else
				{
					var msg = "Group doesn't exist";
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function makeExamByTeacher(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].type == "teacher")
		{
			var ename = data.ename;
			var tuser = data.tuser;
			if (tuser == SK[socket.id].user)
			{
				let existExam = await exam.existNameExam(ename);
				socket.emit(keyout+'load', "1");
				if (existExam == false)
				{
					try
					{
						let addExam = await exam.createExamByTeacher(tuser, SK[socket.id].pass, ename);
						socket.emit(keyout+'load', "50");
						var tx = config.infoTransaction(addExam);
						if (tx.status == true)
						{
							var ddata = {};
							ddata.ename = ename;
							ddata.tuser = tuser;
							ddata.eid = await exam.getIdOfExam(ename);
							socket.emit(keyout, success(ddata, "create Group success"))
							log('(Server) '+SK[socket.id].user+'<-'+keyout+": "+JSON.stringify(ddata));
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
						else
						{
							var msg = 'create exam false'
							log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
							log('(Block ) transaction info: '+JSON.stringify(tx))
						}
					}
					catch(e)
					{
						var msg = 'Error System!'
						socket.emit(keyout, error(msg))
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						log('(Block ) transaction error: '+e)
					}
				}
				else
				{
					var msg = "Exam exist";
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			else
			{
				var msg = "You're not "+tuser;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}	
		}
		else if (SK[socket.id].type == "student")
		{
			var msg = "You're a student, not a teacher";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
		else
		{
			var msg = "Must login before you create group";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function getTimeStamp(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		if (SK[socket.id].user != "none")
		{
			try
			{
				socket.emit(keyout, success(parseInt(moment().valueOf()/1000, 10)+60));
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
		}
	});
}

function autoMask(socket, keyin, keyout)
{
	socket.on(keyin, async function (data){
		log('(Client) '+SK[socket.id].user+'->'+keyin+': '+JSON.stringify(data));
		if (SK[socket.id].user != "student")
		{
			try
			{
				var eid = data.eid;
				var alen = data.alen;
				var aarr = data.aarr;
				var answer = await exam.getLengthAnswerOfExam(eid);
				if (alen == aarr.length && alen == answer)
				{
					let d = await exam.doExamByStudent(SK[socket.id].user, SK[socket.id].pass, eid, aarr);
					var tx = config.infoTransaction(d);
					if (tx.status == true)
					{
						dm = await exam.getMask(SK[socket.id].user, eid);
						var point = Math.round(((10/alen)*dm)*1000)/1000;
						var msg = point+"/"+10;
						socket.emit(keyout, success(msg, "success"));
						log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
						log('(Block ) transaction info: '+JSON.stringify(tx))
					}
					
				}
				else
				{
					var msg = "Error with length answer?";
					socket.emit(keyout, error(msg))
					log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
				}
			}
			catch (e)
			{
				var msg = e;
				socket.emit(keyout, error(msg))
				log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
			}
		}
		else
		{
			var msg = "Must login before you get info";
			socket.emit(keyout, error(msg))
			log('(Server) '+SK[socket.id].user+"<-"+keyout+": "+msg)
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