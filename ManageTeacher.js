const config = require('./config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

let log = config.log;

var teacher = new web3.eth.Contract(config.abiTeacher, config.addressTeacher, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

function addUser(user, password, name, phone, ic)
{
	log('(Server) send... Teacher addUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.addUser(user, password, name, phone, ic).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function deleteUser(user)
{
	log('(Server) send... Teacher deleteUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.deleteUser(user).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function editUser(user, password, name, phone, ic)
{
	log('(Server) send... Teacher editUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.editUser(user, password, name, phone, ic).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function setNameUser(user, name)
{
	log('(Server) send... Teacher setNameUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.setNameUser(user, name).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function setPassUser(user, pass)
{
	log('(Server) send... Teacher setPassUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.setPassUser(user, pass).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function setPhoneUser(user, phone)
{
	log('(Server) send... Teacher setPhoneUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.setPhoneUser(user, phone).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function setIcUser(user, ic)
{
	log('(Server) send... Teacher serIcUser');
	return new Promise(function (resolve, reject){
		var builder = teacher.methods.setIcUser(user, ic).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressTeacher, builder);
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

function getLengthUser()
{
	return new Promise(function(rs, rj)
	{
		teacher.methods.getLengthUser().call().then(function(rt){
			return rs(rt);
		})
	})
}

function getNameUser(user)
{
	return new Promise(function(rs, rj)
	{
		teacher.methods.getNameUser(user).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getPassUser(user)
{
	return new Promise(function(rs, rj)
	{
		teacher.methods.getPassUser(user).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getPhoneUser(user)
{
	return new Promise(function(rs, rj)
	{
		teacher.methods.getPhoneUser(user).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getIcUser(user)
{
	return new Promise(function(rs, rj)
	{
		teacher.methods.getIcUser(user).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function getUser(i)
{
	return new Promise(function(rs, rj)
	{
		teacher.methods.getUser(i).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj(data[1]);
		})
	})
}

function userExist(user)
{
	return new Promise(function(rs, rj){
		teacher.methods.userExist(user).call().then(function(rt){
			return rs(rt);
		})
	})
}

async function getAllTeacher()
{
	var len = await getLengthUser();
	var arr = [];
	for (var i=0; i<len; i++)
	{
		var item = await getUser(i);
		arr.push(item)
	}
	return arr;
}

async function getInfoTeacher(user)
{
	var info = {};
	try
	{
		var name = await getNameUser(user);
		var phone = await getPhoneUser(user);
		var CMND = await getIcUser(user);
		info.name = name;
		info.phone = phone;
		info.cmnd = CMND;
		return info;
	}
	catch(e)
	{
		throw new Error(e);
	}
}

async function getInfoAllTeacher()
{
	var len = await getLengthUser();
	var arr = [];
	for (var i=0; i<len; i++)
	{
		var info = {};
		try
		{
			var item = await getUser(i);
			info = await getInfoTeacher(item);
			info.item = item;
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

// addUser("testuser", "testpass", "testname", "testphone").then(console.log);
// deleteUser('testuser').then(console.log).catch(console.log);
// editUser('testuser', '123', '456', '789').then(console.log).catch(console.log);
// setPassUser('testuser', 'hello').then(console.log).catch(console.log);
// setNameUser('testuser', 'Le Binh Duong').then(console.log).catch(console.log);
// setPhoneUser('testuser', '0568417').then(console.log).catch(console.log);
// setIcUser

// getLengthUser().then(console.log);
// getNameUser('testuser').then(console.log).catch(console.log);
// getPassUser('testuser').then(console.log).catch(console.log);
// getPhoneUser('testuser').then(console.log).catch(console.log);
// getUser(-1).then(console.log).catch(console.log);
// userExist('testusers').then(console.log)

// getAllTeacher().then(console.log);

module.exports =
{
	addUser: addUser,
	deleteUser: deleteUser,
	editUser: editUser,

	setPassUser: setPassUser,
	setNameUser: setNameUser,
	setPhoneUser: setPhoneUser,
	setIcUser: setIcUser,

	getNameUser: getNameUser,
	getPassUser: getPassUser,
	getPhoneUser: getPhoneUser,
	getIcUser: getIcUser,

	
	getLengthUser: getLengthUser,
	getUser: getUser,

	userExist,
	getInfoAllTeacher: getInfoAllTeacher
}