const config = require('./config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

let log = config.log

var student = new web3.eth.Contract(config.abiStudent, config.addressStudent, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

function addUser(user, password, name, phone)
{
	log('(Server) send... Student addUser');
	return new Promise(function (resolve, reject){
		var builder = student.methods.addUser(user, password, name, phone).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressStudent, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		});
			}
		});
	})
}

function deleteUser(user)
{
	log('(Server) send... Student deleteUser');
	return new Promise(function (resolve, reject){
		var builder = student.methods.deleteUser(user).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressStudent, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		});
			}
		});
	})
}

function editUser(user, password, name, phone)
{
	log('(Server) send... Student editUser');
	return new Promise(function (resolve, reject){
		var builder = student.methods.editUser(user, password, name, phone).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressStudent, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		});
			}
		});
	})
}

function setNameUser(user, name)
{
	log('(Server) send... Student setNameUser');
	return new Promise(function (resolve, reject){
		var builder = student.methods.setNameUser(user, name).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressStudent, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		});
			}
		});
	})
}

function setPassUser(user, pass)
{
	log('(Server) send... Student serPassUser');
	return new Promise(function (resolve, reject){
		var builder = student.methods.setPassUser(user, pass).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressStudent, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		});
			}
		});
	})
}

function setPhoneUser(user, phone)
{
	log('(Server) send... Student serPhoneUser');
	return new Promise(function (resolve, reject){
		var builder = student.methods.setPhoneUser(user, phone).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressStudent, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		});
			}
		});
	})
}

function getLengthUser()
{
	return new Promise(function(rs, rj)
	{
		student.methods.getLengthUser().call().then(function(rt){
			return rs(rt);
		})
	})
}

function getNameUser(user)
{
	return new Promise(function(rs, rj)
	{
		student.methods.getNameUser(user).call().then(function(data){
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
		student.methods.getPassUser(user).call().then(function(data){
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
		student.methods.getPhoneUser(user).call().then(function(data){
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
		student.methods.getUser(i).call().then(function(data){
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
		student.methods.userExist(user).call().then(function(rt){
			return rs(rt);
		})
	})
}

// addUser("testuser", "testpass", "testname", "testphone").then(console.log);
// deleteUser('testuser').then(console.log).catch(console.log);
// editUser('testuser', '123', '456', '789').then(console.log).catch(console.log);
// setPassUser('testuser', 'hello').then(console.log).catch(console.log);
// setNameUser('testuser', 'Le Binh Duong').then(console.log).catch(console.log);
// setPhoneUser('testuser', '0568417').then(console.log).catch(console.log);

// getLengthUser().then(console.log);
// getNameUser('testuser').then(console.log).catch(console.log);
// getPassUser('testuser').then(console.log).catch(console.log);
// getPhoneUser('testuser').then(console.log).catch(console.log);
// getUser(-1).then(console.log).catch(console.log);
// userExist('testusers').then(console.log)

module.exports =
{
	addUser: addUser,
	deleteUser: deleteUser,
	editUser: editUser,

	setPassUser: setPassUser,
	setNameUser: setNameUser,
	setPhoneUser: setPhoneUser,

	getNameUser: getNameUser,
	getPassUser: getPassUser,
	getPhoneUser: getPhoneUser,
	
	getLengthUser: getLengthUser,
	getUser: getUser,

	userExist
}