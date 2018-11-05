const keyAPI = "79KTIDWR8NE2G8CP6I5JBGVAUCFYNWU3RH";

const httpProvider = "https://kovan.infura.io/"+keyAPI;

const addressStudent = '0xfe893078af734b5bf258145b106e05b3814c91b5';
const addressTeacher = '0xb07f25a4baa33b72f26e252ba7f8fb70966b61b2';
const addressGroup = '0xf4e99f902fec6202a8a26c5d450181df896d21a5';
const addressJoin = '0xf50538542cf40022edb718f5603673a37d57186f';
const addressManage = '0xa9d20c302cc353e568c4e105c641dad10c7b4535';

const addressFrom = '0x5609c3ece14be63dff0bc314610990608bc6a7de';
const privateKey = '0xB75C5664625CADD6D18AAC559D54064310C4A82F8A90E7D61ECC61DAF5A9816F';

const gasPrice = '40000000000';
const gasLimit = 6000000;

function transaction(ffrom, tto, ddata)
{
	let transactionObject =
	{
		gas: gasLimit,
	    data: ddata,
	    from: ffrom,
	    to: tto
	};
	return transactionObject;
}

function infoTransaction(receipt)
{
	var tx = {};
	tx.status = receipt.status
	tx.transactionHash = receipt.transactionHash
	tx.blockNumber = receipt.blockNumber
	tx.transactionIndex = receipt.transactionIndex

	return tx;
}

function log(data)
{
	var date = new Date();
	var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    time = "["+year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec+"]";
    console.log(time+": "+data)
}

function getDate()
{
	var date = new Date();
	var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "/" + month + "/" + day;
}

const abiStudent = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "pw",
				"type": "string"
			},
			{
				"name": "n",
				"type": "string"
			},
			{
				"name": "p",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "pw",
				"type": "string"
			},
			{
				"name": "n",
				"type": "string"
			},
			{
				"name": "p",
				"type": "string"
			}
		],
		"name": "editUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "setNameUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "pw",
				"type": "string"
			}
		],
		"name": "setPassUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "p",
				"type": "string"
			}
		],
		"name": "setPhoneUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLengthUser",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getNameUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getPassUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getPhoneUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "userExist",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const abiTeacher = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "pw",
				"type": "string"
			},
			{
				"name": "n",
				"type": "string"
			},
			{
				"name": "p",
				"type": "string"
			},
			{
				"name": "ic",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "pw",
				"type": "string"
			},
			{
				"name": "n",
				"type": "string"
			},
			{
				"name": "p",
				"type": "string"
			},
			{
				"name": "ic",
				"type": "string"
			}
		],
		"name": "editUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "ic",
				"type": "string"
			}
		],
		"name": "setIcUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "setNameUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "pw",
				"type": "string"
			}
		],
		"name": "setPassUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "p",
				"type": "string"
			}
		],
		"name": "setPhoneUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getIcUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLengthUser",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getNameUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getPassUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getPhoneUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "userExist",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const abiGroup = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "addGroup",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "deleteGroup",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "editGroup",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "existGroup",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "existIdGroup",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "getGid",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "item",
				"type": "uint256"
			}
		],
		"name": "getId",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLengthId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getNameGroup",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const abiJoin = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "deleteGroup",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "groupRefuse",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "joinGruop",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "userRefuse",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getGroup",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getLengthGroup",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getLengthUser",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "g",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const abiManage = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			},
			{
				"name": "d",
				"type": "string"
			}
		],
		"name": "addManage",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "deleteManage",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getDate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getGroup",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			}
		],
		"name": "getLengthListGroup",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getTeacher",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "u",
				"type": "uint256"
			}
		],
		"name": "groupExist",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];



module.exports = 
{
	keyAPI: keyAPI,

	httpProvider: httpProvider,

	addressStudent: addressStudent,
	addressTeacher: addressTeacher,
	addressGroup: addressGroup,
	addressJoin: addressJoin,
	addressManage: addressManage,

	addressFrom: addressFrom,
	privateKey: privateKey,

	abiStudent: abiStudent,
	abiTeacher: abiTeacher,
	abiGroup: abiGroup,
	abiJoin: abiJoin,
	abiManage: abiManage,

	gasPrice: gasPrice,
	gasLimit: gasLimit,

	createTransaction: transaction,
	infoTransaction: infoTransaction,
	getDate: getDate,
	log: log
}