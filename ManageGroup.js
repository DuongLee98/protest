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

function addGroup(name)
{
	log('(Server) send... addGroup');
	return new Promise (function(resolve, reject){
		var builder = group.methods.addGroup(name).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressGroup, builder);
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
	});
}

function deleteGroup(id)
{
	log('(Server) send... deleteGroup');
	return new Promise (function(resolve, reject){
		var builder = group.methods.deleteGroup(id).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressGroup, builder);
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
	});
}

function editGroup(id, name)
{
	log('(Server) send... editGroup');
	return new Promise (function(resolve, reject){
		var builder = group.methods.editGroup(id, name).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressGroup, builder);
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
	});
}

function getId(item)
{
	return new Promise(function(rs, rj)
	{
		group.methods.getId(item).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getGid(name)
{
	return new Promise(function(rs, rj)
	{
		group.methods.getGid(name).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getLengthId()
{
	return new Promise(function(rs, rj)
	{
		group.methods.getLengthId().call().then(function(rt){
			return rs(rt);
		})
	})
}

function getNameGroup(id)
{
	return new Promise(function(rs, rj)
	{
		group.methods.getNameGroup(id).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function existGroup(name)
{
	return new Promise(function(rs, rj)
	{
		group.methods.existGroup(name).call().then(function(rt){
			return rs(rt);
		})
	})
}

function existIdGroup(idg)
{
	return new Promise(function(rs, rj)
	{
		group.methods.existIdGroup(idg).call().then(function(rt){
			return rs(rt);
		})
	})
}

function groupAddUser(group, user)
{
	log('(Server) send... groupAddUser');
	return new Promise(function(resolve, reject){
		var builder = join.methods.addUser(user, group).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressJoin, builder);
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
	});
}

function groupRefuseUser(group, user)
{
	log('(Server) send... groupRefuseUser');
	return new Promise(function(resolve, reject){
		var builder = join.methods.groupRefuse(user, group).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressJoin, builder);
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
	});
}

function userJoinGroup(user, group)
{
	log('(Server) send... userJoinGroup');
	return new Promise(function(resolve, reject){
		var builder = join.methods.joinGruop(user, group).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressJoin, builder);
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
	});
}

function userRefuseGroup(user, group)
{
	log('(Server) send... userRefuseGroup');
	return new Promise(function(resolve, reject){
		var builder = join.methods.userRefuse(user, group).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressJoin, builder);
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
	});
}

function getGroupOfUser(user, index)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getGroup(user, index).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getLengthGroupOfUser(user)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getLengthGroup(user).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getLengthUserOfGroup(group)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getLengthUser(group).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getStatus(user, group)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getStatus(user, group).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getUserOfGroup(group, index)
{
	return new Promise(function(rs, rj)
	{
		join.methods.getUser(group, index).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function addManage(user, group)
{
	log('(Server) send... addManage');
	return new Promise(function(resolve, reject){
		var builder = manage.methods.addManage(user, group, config.getDate()).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManage, builder);
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
	});
}

function deleteManage(user, group)
{
	log('(Server) send... deleteManage');
	return new Promise(function(resolve, reject){
		var builder = manage.methods.deleteManage(user, group).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressManage, builder);
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
	});
}

function getDate(user, group)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getDate(user, group).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getGroupOfTeacher(user, index)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getGroup(user, index).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getLengthGroupOfTeacher(user)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getLengthListGroup(user).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getStatusManage(user, group)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getStatus(user, group).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getTeacherOfGroup(group)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.getTeacher(group).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function groupExistManage(group)
{
	return new Promise(function(rs, rj)
	{
		manage.methods.groupExist(group).call().then(function(rt){
			return rs(rt);
		})
	})
}

async function getInfoAllGroupTeacherManage(teacher)
{
	var arr = [];
	let len = await getLengthGroupOfTeacher(teacher);
	for (var i=0; i<len; i++)
	{
		var info = {};
		try
		{
			let gid = await getGroupOfTeacher(teacher, i);
			let gdate = await getDate(teacher, gid);
			let gname = await getNameGroup(gid);
			let gmember = await getLengthUserOfGroup(gid);

			info.gid = gid;
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
	let len = await getLengthUserOfGroup(group)
	let arr = [];
	for (var i = 0; i<len; i++)
	{
		info = {};
		try
		{
			let nameuser = await getUserOfGroup(group, i);
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
	let len = await getLengthGroupOfUser(student);
	for (var i=0; i<len; i++)
	{
		var info = {};
		try
		{
			let gid = await getGroupOfUser(student, i);
			let status = await getStatus(student, gid);
			let gname = await getNameGroup(gid);
			let gmember = await getLengthUserOfGroup(gid);
			let userteacher = await getTeacherOfGroup(gid);
			info.gid = gid;
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

// addGroup("testgroup").then(console.log).catch(console.log)
// editGroup(1000, 'testgroup').then(console.log).catch(console.log)
// deleteGroup(1003).then(console.log).catch(console.log)
// getGid("testgroup").then(console.log);
// getId(0).then(console.log)
// getLengthId().then(console.log)
// getNameGroup(1007).then(console.log)
// existGroup('testgroup').then(console.log)
// existIdGroup(1009).then(console.log);
//-----------------------------------------------------------------------
// groupAddUser(1007, "duonglee").then(function(data){
// 	console.log(config.infoTransaction(data));
// });
// getGroupOfUser("duonglee", 0).then(console.log);
// getLengthGroupOfUser("duonglee").then(console.log);
// getLengthUserOfGroup(1009).then(console.log);
// getStatus("duonglee", 1007).then(console.log);
// getUserOfGroup(1007, 0).then(console.log);
// groupRefuseUser(1007, "HAT").then(function(data){
// 	console.log(config.infoTransaction(data));
// })
// userJoinGroup("duonglee", 1000).then(function(data){
// 	console.log(config.infoTransaction(data));
// });
// userRefuseGroup("duonglee", 1000).then(function(data){
// 	console.log(config.infoTransaction(data));
// })
//-----------------------------------------------------------------------
// addManage("duonglee", 1000).then(function(data){
// 	console.log(config.infoTransaction(data));
// });
// deleteManage("xuanhuy", 1002).then(function(data){
// 	console.log(config.infoTransaction(data));
// })
// getDate("xuanhuy", 1003).then(console.log);
// getGroupOfTeacher("xuanhuy", 0).then(console.log);
// getLengthGroupOfTeacher("xuanhuy").then(console.log);
// getStatusManage("duonglee", 1000).then(console.log);
// getTeacherOfGroup(1000).then(console.log);
// groupExistMange(1000).then(console.log);
//------------------------------------------------------------------------
// getInfoAllGroupTeacherManage("xuanhuy").then(console.log);
// getAllStudentOfGroup(1007).then(console.log);
// getInfoAllGroupStudentJoin("duonglee").then(console.log);

module.exports =
{
	addGroup: addGroup,
	editGroup: editGroup,
	deleteGroup: deleteGroup,

	getId: getId,
	getLengthId: getLengthId,
	getNameGroup: getNameGroup,
	getGid: getGid,
	
	existIdGroup: existIdGroup,
	existGroup: existGroup,

	groupAddUser: groupAddUser,
	groupRefuseUser: groupRefuseUser,
	userJoinGroup: userJoinGroup,
	userRefuseGroup: userRefuseGroup,

	getGroupOfUser: getGroupOfUser,
	getLengthGroupOfUser: getLengthGroupOfUser,
	getLengthUserOfGroup: getLengthUserOfGroup,
	getStatus: getStatus,
	getUserOfGroup: getUserOfGroup,

	addManage: addManage,
	deleteManage: deleteManage,
	
	getDate: getDate,
	getGroupOfTeacher: getGroupOfTeacher,
	getLengthGroupOfTeacher: getLengthGroupOfTeacher,
	getStatusManage: getStatusManage,
	getTeacherOfGroup: getTeacherOfGroup,
	groupExistManage: groupExistManage,

	getInfoAllGroupTeacherManage: getInfoAllGroupTeacherManage,
	getAllStudentOfGroup: getAllStudentOfGroup,
	deleteAllStudentOfGroup: deleteAllStudentOfGroup,
	getInfoAllGroupStudentJoin: getInfoAllGroupStudentJoin
}