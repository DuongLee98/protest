const config = require('./config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

let log = config.log;

var exam = new web3.eth.Contract(config.abiExam, config.addressExam, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});
var make = new web3.eth.Contract(config.abiMake, config.addressMake, {
    from: config.addressFrom,
    gasPrice: config.gasPrice
});

function addExam(n)
{
	log('(Server) send... addExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.addExam(n).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("addExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("addExam: "+err);
		 		})
			}
		});
	});
}

function addOrSetAnswerOfExam(id, i, aw)
{
	log('(Server) send... addOrSetAnswerOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.addOrSetAnswerOfExam(id, i, aw).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("addOrSetAnswerOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("addOrSetAnswerOfExam: "+err);
		 		})
			}
		});
	});
}

function addOrSetQuestionOfExam(id, i, nq)
{
	log('(Server) send... addOrSetQuestionOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.addOrSetQuestionOfExam(id, i, nq).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("addOrSetQuestionOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("addOrSetQuestionOfExam: "+err);
		 		})
			}
		});
	});
}

function addOrSetSelectionOfQuestionInExam(id, q, s, ns)
{
	log('(Server) send... addOrSetSelectionOfQuestionInExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.addOrSetSelectionOfQuestionInExam(id, q, s, ns).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("addOrSetSelectionOfQuestionInExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("addOrSetSelectionOfQuestionInExam: "+err);
		 		})
			}
		});
	});
}

function deleteExam(id)
{
	log('(Server) send... deleteExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.deleteExam(id).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("deleteExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("deleteExam: "+err);
		 		})
			}
		});
	});
}

function editName(id, nn)
{
	log('(Server) send... editName');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.editName(id, nn).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("editName: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("editName: "+err);
		 		})
			}
		});
	});
}

function setLengthAnswerOfExam(id, len)
{
	log('(Server) send... setLengthAnswerOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setLengthAnswerOfExam(id, len).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setLengthAnswerOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setLengthAnswerOfExam: "+err);
		 		})
			}
		});
	});
}

function setLengthQuestionOfExam(id, len)
{
	log('(Server) send... setLengthQuestionOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setLengthQuestionOfExam(id, len).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setLengthQuestionOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setLengthQuestionOfExam: "+err);
		 		})
			}
		});
	});
}

function setLengthSelectionOfQuestionInExam(id, q, l)
{
	log('(Server) send... setLengthSelectionOfQuestionInExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setLengthSelectionOfQuestionInExam(id, q, l).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setLengthSelectionOfQuestionInExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setLengthSelectionOfQuestionInExam: "+err);
		 		})
			}
		});
	});
}

function setPublicOfExam(id, p)
{
	log('(Server) send... setPublicOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setPublicOfExam(id, p).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setPublicOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setPublicOfExam: "+err);
		 		})
			}
		});
	});
}

function setTimeEndOfExam(id, t)
{
	log('(Server) send... setTimeEndOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setTimeEndOfExam(id, t).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setTimeEndOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setTimeEndOfExam: "+err);
		 		})
			}
		});
	});
}

function setTimeStartOfExam(id, t)
{
	log('(Server) send... setTimeStartOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setTimeStartOfExam(id, t).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setTimeStartOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setTimeStartOfExam: "+err);
		 		})
			}
		});
	});
}

function setTypeOfExam(id, tp)
{
	log('(Server) send... setTypeOfExam');
	return new Promise (function(resolve, reject){
		var builder = exam.methods.setTypeOfExam(id, tp).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressExam, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setTypeOfExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setTypeOfExam: "+err);
		 		})
			}
		});
	});
}

function existQuestionOfExam(id, q)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.existQuestionOfExam(id, q).call(id, s).then(function(rt){
			return rs(rt);
		})
	})
}

function existSelectionOfQuestionInExam(id, q, s)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.existSelectionOfQuestionInExam(id, q, s).call().then(function(rt){
			return rs(rt);
		})
	})
}

function existTimeEndOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.existTimeEndOfExam(id).call().then(function(rt){
			return rs(rt);
		})
	})
}

function existTimeStartOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.existTimeStartOfExam(id).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getAnswerOfExam(id, i)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getAnswerOfExam(id, i).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getAnswerOfExam: "+data[1]);
		})
	})
}

function getExistId(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getExistId(id).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getExistName(n)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getExistName(n).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getId(i)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getId(i).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getId: "+data[1]);
		})
	})
}

function getIdOfExam(n)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getIdOfExam(n).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getIdOfExam: "+data[1]);
		})
	})
}

function getLengthAnswerOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getLengthAnswerOfExam(id).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getLengthExam()
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getLengthExam().call().then(function(rt){
			return rs(rt);
		})
	})
}

function getLengthQuestionOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getLengthQuestionOfExam(id).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getLengthSelectionOfQuestionInExam(id, q)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getLengthSelectionOfQuestionInExam(id, q).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getNameOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getNameOfExam(id).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getNameOfExam: "+data[1]);
		})
	})
}

function getPublicOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getPublicOfExam(id).call().then(function(rt){
			return rs(rt);
		})
	})
}

function getQuestionOfExam(id, i)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getQuestionOfExam(id, i).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getQuestionOfExam: "+data[1]);
		})
	})
}

function getSelectionOfQestionInExam(id, q, s)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getSelectionOfQestionInExam(id, q, s).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getSelectionOfQestionInExam: "+data[1]);
		})
	})
}

function getTimeEndOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getTimeEndOfExam(id).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getTimeEndOfExam: "+data[1]);
		})
	})
}

function getTimeStartOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getTimeStartOfExam(id).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getTimeStartOfExam: "+data[1]);
		})
	})
}

function getTypeOfExam(id)
{
	return new Promise(function(rs, rj)
	{
		exam.methods.getTypeOfExam(id).call().then(function(rt){
			return rs(rt);
		})
	})
}
//--------------------------------------------------------------------------
function addMake(t, e)
{
	log('(Server) send... addMake');
	return new Promise (function(resolve, reject){
		var builder = make.methods.addMake(t, e, config.getDate()+"-"+config.getTime()).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressMake, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("addMake: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("addMake: "+err);
		 		})
			}
		});
	});
}
function deleteMake(t, e)
{
	log('(Server) send... deleteMake');
	return new Promise (function(resolve, reject){
		var builder = make.methods.deleteMake(t, e).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressMake, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("deleteMake: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("deleteMake: "+err);
		 		})
			}
		});
	});
}
function setAcceptGroupForExam(t, e, g, acc)
{
	log('(Server) send... setAcceptGroupForExam');
	return new Promise (function(resolve, reject){
		var builder = make.methods.setAcceptGroupForExam(t, e, g, acc).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressMake, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject("setAcceptGroupForExam: "+error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject("setAcceptGroupForExam: "+err);
		 		})
			}
		});
	});
}
function examExist(u)
{
	return new Promise(function(rs, rj)
	{
		make.methods.examExist(u).call().then(function(rt){
			return rs(rt);
		})
	})
}
function getAcceptGroupForExam(t, e, g)
{
	return new Promise(function(rs, rj)
	{
		make.methods.getAcceptGroupForExam(t, e, g).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getAcceptGroupForExam: "+data[1]);
		})
	})
}
function getDate(u, e)
{
	return new Promise(function(rs, rj)
	{
		make.methods.getDate(u, e).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getDate: "+data[1]);
		})
	})
}
function getExamInMake(u, i)
{
	return new Promise(function(rs, rj)
	{
		make.methods.getExam(u, i).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getDate: "+data[1]);
		})
	})
}
function getLengthListExam(u)
{
	return new Promise(function(rs, rj)
	{
		make.methods.getLengthListExam(u).call().then(function(rt){
			return rs(rt);
		})
	})
}
function getStatus(u, e)
{
	return new Promise(function(rs, rj)
	{
		make.methods.getStatus(u, e).call().then(function(rt){
			return rs(rt);
		})
	})
}
function getTeacher(e)
{
	return new Promise(function(rs, rj)
	{
		make.methods.getTeacher(e).call().then(function(data){
			if (data[0] == true)
				return rs(data[2]);
			else
				return rj("getDate: "+data[1]);
		})
	})
}
//--------------------------------------------------------------------------

async function getDetailExam(id)
{
	var edata = {};
	try
	{
		edata.tuser = await getTeacher(id);
		edata.name = await getNameOfExam(id);
		edata.created = await getDate(edata.tuser, id);
		edata.eid = id;
		edata.type = await getTypeOfExam(id);
		edata.timeStart = await getTimeStartOfExam(id);
		edata.timeEnd = await getTimeEndOfExam(id);
		edata.qlen = await getLengthQuestionOfExam(id);
		edata.publish = await getPublicOfExam(id);
		return edata;
	}
	catch(e)
	{
		throw new Error(e);
	}
}

async function getExam(id)
{
	var edata = {};
	try
	{
		edata = await getDetailExam(id);
		let qarr = [];
		for (var q=0; q<edata.qlen; q++)
		{
			var qdata = {};
			qdata.q = await getQuestionOfExam(id, q);
			qdata.slen = await getLengthSelectionOfQuestionInExam(id, q);
			let sarr = [];
			for (var s = 0; s<qdata.slen; s++)
			{
				var ss = await getSelectionOfQestionInExam(id, q, s);
				sarr.push(ss);
			}
			qdata.sarr = sarr;
			qarr.push(qdata);
		}
		edata.qarr = qarr;
		return edata;
	}
	catch(e)
	{
		throw new Error(e);
	}
}

async function getAllAnswerOfExam(id)
{
	var edata = {};
	try
	{
		let alen = await getLengthAnswerOfExam(id);
		let aarr = [];
		for (var q=0; q<alen; q++)
		{
			var ansewr = await getAnswerOfExam(id, q);
			aarr.push(ansewr);
		}
		edata.alen = alen;
		edata.aarr = aarr;
		return edata;
	}
	catch(e)
	{
		throw new Error(e);
	}
}

async function getInfoAllExamTeacherMake(tuser)
{
	let data = {};
	try
	{
		data.len = await getLengthListExam(tuser);
		var arr = [];
		for (var i=0; i<data.len; i++)
		{
			var eid = await getExamInMake(tuser, i);
			var otmp = await getDetailExam(eid);
			arr.push(otmp);
		}
		data.arr = arr;
		return data;
	}
	catch(e)
	{
		throw new Error(e);
	}
}

// addExam("Exam Test2").then(console.log);
// setTypeOfExam(10001, "Chemistry").then(console.log);
// setTimeStartOfExam(10001, config.getDate()+"-"+config.getTime()).then(console.log);
// setTimeEndOfExam(10000, "2018/11/16-PM:08:08:08").then(console.log);
// addOrSetQuestionOfExam(10000, 1, "Q2?").then(console.log);
// addOrSetSelectionOfQuestionInExam(10000, 0, 1, "S2-1.").then(console.log);
// addOrSetAnswerOfExam(10000, 1, 0).then(console.log);
// getLengthExam().then(console.log);
// getIdOfExam("Exam Test2").then(console.log);
// getAnswerOfExam(10000, 1).then(console.log)
// getAllAnswerOfExam(10000).then(console.log);
//-------------------------------------------------------------------------------------
// addMake("xuanhuy", 10001).then(console.log);
// examExist(10000).then(console.log);
// getAcceptGroupForExam("xuanhuy", 10000, 1010).then(console.log);
// getDate("xuanhuy", 10000).then(console.log);
// getExamInMake("xuanhuy", 0).then(console.log);
// getLengthListExam("xuanhuy").then(console.log);
// getTeacher(10000).then(console.log);
// setAcceptGroupForExam("xuanhuy", 10000, 1010, true).then(console.log);
// deleteMake("xuanhuy", 10000).then(console.log);
//-----------------------------------------------------------------------------
// getExam(10001).then(function (data){
// 	console.log(data);
// });
// getDetailExam(10000).then(console.log);
// getInfoAllExamTeacherMake("xuanhuy").then(console.log);

module.exports = 
{
	getExistId: getExistId,

	getAcceptGroupForExam: getAcceptGroupForExam,

	getExam: getExam,
	getAllAnswerOfExam: getAllAnswerOfExam,
	getInfoAllExamTeacherMake: getInfoAllExamTeacherMake
}