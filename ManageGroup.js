const config = require('./config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

let log = config.log;

var group = new web3.eth.Contract(config.abiGroup, config.addressGroup, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

var join = new web3.eth.Contract(config.abiJoin, config.addressJoin, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

var manage = new web3.eth.Contract(config.abiManage, config.addressManage, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

var managegroup = new web3.eth.Contract(config.abiManageGroup, config.addressManageGroup, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

//Group---------------------------------------------------------------------------
function existIdGroup(id)
{
	return new Promise(function(rs, rj)
	{
		group.methods.existIdGroup(id).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function existNameGroup(name)
{
	return new Promise(function(rs, rj)
	{
		group.methods.existNameGroup(name).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getAllIdGroup()
{
	return new Promise(function(rs, rj)
	{
		group.methods.getAllIdGroup().call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getIdGroup(i)
{
	return new Promise(function(rs, rj)
	{
		group.methods.getIdGroup(i).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getIdNameGroup(name)
{
	return new Promise(function(rs, rj)
	{
		group.methods.getIdNameGroup(name).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getLengthIdGroup()
{
	return new Promise(function(rs, rj)
	{
		group.methods.getLengthIdGroup().call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getNameGroup(id)
{
	return new Promise(function(rs, rj)
	{
		group.methods.getNameGroup(id).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

//Manage---------------------------------------------------------------------------
function getAllIdGroupTeacher(user)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getAllIdGroupTeacher(user).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getDate(user, id)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getDate(user, id).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getLengthGroupTeacherManage(user)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getLengthGroupTeacherManage(user).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getStatusTeacherGroup(user, id)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getStatus(user, id).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getTeacherManage(id)
{
	return new Promise(function(rs, rj){
		manage.methods.getTeacher(id).call(function(error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		})
	})
}

function groupExistInManage(id)
{
	return new Promise(function(rs, rj){
		manage.methods.groupExist(id).call(function(error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		})
	})
}

//Join------------------------------------------------------------------------------------------------
function getAllIdGroupStudent(user)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getAllGroupOfUser(user).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getIdGroupStudent(user, i)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getJGroup(user, i).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getStatusGroupStudent(user, id)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getJStatus(user, id).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getUserStudentGroup(id, i)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getJUser(id, i).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getLengthGroupStudent(user)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getLengthJGroup(user).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getLengthStudentGroup(id)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getLengthJUser(id).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

//ManageGroup-----------------------------------------------------------------------------
function createGroupByTeacher(user, pass, namegroup)
{
	log('(Server) send... deleteStudentUser' + user);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.createGroupByTeacher(user, pass, namegroup).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function deleteGroupByTeacher(user, pass, id)
{
	log('(Server) send... deleteStudentUser' + user);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.deleteGroupByTeacher(user, pass, id).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function editGroupByTeacher(user, pass, id, newname)
{
	log('(Server) send... deleteStudentUser' + user);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.editGroupByTeacher(user, pass, id, newname).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function groupAddOrInviteStudentByTeacher(user, pass, gid, suser)
{
	log('(Server) send... deleteStudentUser' + user);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.groupAddOrInviteStudentByTeacher(user, pass, gid, suser).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function groupDeleteOrRefuseStudentByTeacher(user, pass, gid, suser)
{
	log('(Server) send... deleteStudentUser' + user);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.groupDeleteOrRefuseStudentByTeacher(user, pass, gid, suser).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function studentExitOrRefuseGroup(suser, pass, gid)
{
	log('(Server) send... deleteStudentUser' + suser);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.studentExitOrRefuseGroup(suser, pass, gid).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function studentJoinOrAcceptGroup(suser, pass, gid)
{
	log('(Server) send... deleteStudentUser' + suser);
	return new Promise(function (resolve, reject){
		var builder = managegroup.methods.studentJoinOrAcceptGroup(suser, pass, gid).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManageGroup, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}


async function getInfoAllGroupTeacherManage(teacher)
{
	var arr = [];
	let len = await getLengthGroupTeacherManage(teacher);
	let garr = await getAllIdGroupTeacher(teacher);
	for (var i=0; i<len; i++)
	{
		var info = {};
		try
		{
			let gid = parseInt(garr[i], 10);
			let gdate = await getDate(teacher, gid);
			let gname = await getNameGroup(gid);
			let gmember = await getLengthStudentGroup(gid);

			info.gid = parseInt(gid);
			info.gdate = gdate;
			info.gname = gname;
			info.gmember = gmember;
			arr.push(info); 
		}
		catch(e)
		{
			throw new Error(e);
		}
	}
	data = {};
	data.len = len;
	data.arr = arr;
	return data;
}

async function getAllStudentOfGroup(group)
{
	let len = await getLengthStudentGroup(group)
	let arr = [];
	for (var i = 0; i<len; i++)
	{
		info = {};
		try
		{
			let nameuser = await getUserStudentGroup(group, i);
			arr.push(nameuser);
		}
		catch(e)
		{
			throw new Error(e)
		}
	}
	data = {};
	data.len = len;
	data.arr = arr;
	return data;
}

async function deleteAllStudentOfGroup(idg)
{
	let len = await getLengthUserOfGroup(idg);
	var arr = [];
	var length = 0;
	for (var i=0; i<len; i++)
	{
		try
		{
			let user = await getUserOfGroup(idg, i);
			info = {};
			let deleteUser = await groupRefuseUser(idg, user);
			info = config.infoTransaction(deleteUser);
			arr.push(info);
			length++;
		}
		catch (e)
		{
			throw new Error(e);
		}
	}
	var data = {};
	data.len = length;
	data.arr = arr;
	if (len == length)
		data.status = true;
	else
		data.status = false;
	return data;
}

async function getInfoAllGroupStudentJoin(student)
{
	var arr = [];
	let len = await getLengthGroupStudent(student);
	for (var i=0; i<len; i++)
	{
		var info = {};
		try
		{
			let gid = await getIdGroupStudent(student, i);
			let status = await getStatusGroupStudent(student, gid);
			let gname = await getNameGroup(gid);
			let gmember = await getLengthStudentGroup(gid);
			let userteacher = await getTeacherManage(gid);
			info.gid = parseInt(gid);
			info.status = status;
			info.gname = gname;
			info.gmember = gmember;
			info.tuser = userteacher;
			arr.push(info);
		}
		catch(e)
		{
			throw new Error(e);
		}
	}
	data = {};
	data.len = len;
	data.arr = arr;
	return data;
}

async function getInfoAllGroup(length)
{
	let len;
	if (length == undefined)
	{
		len = await getLengthIdGroup();
	}
	else
	{
		len = length;
	}
	var arr = [];
	for (var i=0; i<len; i++)
	{
		var info = {};
		try
		{
			var gid = await getIdGroup(i);
			var gname = await getNameGroup(gid);
			var tuser = await getTeacherManage(gid)
			var gdate = await getDate(tuser, gid);
			
			info.item = parseInt(gid);
			info.gname = gname;
			info.tuser = tuser;
			info.gdate = gdate;

			arr.push(info)
		}
		catch(e)
		{
			throw new Error(e);
		}
	}
	data = {};
	data.len = len;
	data.arr = arr;
	return data;
}

// existIdGroup(1001).then(console.log);
// existNameGroup('test group').then(console.log);
// getAllIdGroup().then(console.log);
// getIdGroup(0).then(console.log);
// getIdNameGroup("test group").then(console.log);
// getLengthIdGroup().then(console.log);
// getNameGroup(1001).then(console.log);

// getAllIdGroupTeacher("xuanhuy").then(console.log);
// getDate("xuanhuy", 1001).then(console.log);
// getLengthGroupTeacherManage("xuanhuy").then(console.log);
// getStatusTeacherGroup("xuanhuy", 1001).then(console.log);
// getTeacherManage(1005).then(console.log);
// groupExistInManage(1001).then(console.log);

// getAllIdGroupStudent("duonglee").then(console.log);
// getIdGroupStudent("duonglee", 0).then(console.log);
// getStatusGroupStudent("duonglee", 1005).then(console.log);
// getUserStudentGroup(1001, 0).then(console.log);
// getLengthGroupStudent("duonglee").then(console.log);
// getLengthStudentGroup(1001).then(console.log);

// groupAddOrInviteStudentByTeacher("xuanhuy", "protest", 1005, "duonglee").then(console.log);
// studentExitOrRefuseGroup("duonglee", "protest", 1005).then(console.log);
// studentJoinOrAcceptGroup("duonglee", "protest", 1005).then(console.log);
// groupDeleteOrRefuseStudentByTeacher("xuanhuy", "protest", 1001, "duonglee").then(console.log);
// editGroupByTeacher("xuanhuy", "protest", 1001, "grouptest").then(console.log);
// createGroupByTeacher("xuanhuy", "protest", "grouptest2").then(console.log);
// deleteGroupByTeacher("xuanhuy", "protest", 1004).then(console.log);

// getInfoAllGroup(3).then(console.log);

module.exports = 
{
	existNameGroup: existNameGroup,
	getIdNameGroup: getIdNameGroup,
	existIdGroup: existIdGroup,
	getNameGroup: getNameGroup,

	getStatusTeacherGroup: getStatusTeacherGroup,
	getTeacherManage: getTeacherManage,

	createGroupByTeacher: createGroupByTeacher,
	deleteGroupByTeacher: deleteGroupByTeacher,
	editGroupByTeacher: editGroupByTeacher,

	getInfoAllGroupTeacherManage: getInfoAllGroupTeacherManage,
	getStatusGroupStudent: getStatusGroupStudent,
	groupAddOrInviteStudentByTeacher: groupAddOrInviteStudentByTeacher,
	groupDeleteOrRefuseStudentByTeacher: groupDeleteOrRefuseStudentByTeacher,
	studentJoinOrAcceptGroup: studentJoinOrAcceptGroup,
	studentExitOrRefuseGroup: studentExitOrRefuseGroup,

	getInfoAllGroup: getInfoAllGroup,
	getAllStudentOfGroup: getAllStudentOfGroup,
	getInfoAllGroupStudentJoin: getInfoAllGroupStudentJoin
}