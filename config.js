const keyAPI = "79KTIDWR8NE2G8CP6I5JBGVAUCFYNWU3RH";

const httpProvider = "https://kovan.infura.io/"+keyAPI;

const addressStudent = '0x2c2ff669d7855db74f17eb1330ce1d1851d22c85';
const addressTeacher = '0x8ef7e7192ceee1620a8121e1e59bcbb43f3f5f74';
const addressFrom = '0x5609c3ece14be63dff0bc314610990608bc6a7de';
const privateKey = '0xB75C5664625CADD6D18AAC559D54064310C4A82F8A90E7D61ECC61DAF5A9816F';

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

const gasPrice = '20000000000';
const gasLimit = 3000000;

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

module.exports = 
{
	keyAPI: keyAPI,

	httpProvider: httpProvider,

	addressStudent: addressStudent,
	addressTeacher: addressTeacher,
	addressFrom: addressFrom,
	privateKey: privateKey,

	abiStudent: abiStudent,
	abiTeacher: abiTeacher,

	gasPrice: gasPrice,
	gasLimit: gasLimit,

	createTransaction: transaction,
	log: log
}