const keyAPI = "79KTIDWR8NE2G8CP6I5JBGVAUCFYNWU3RH";

const httpProvider = "https://kovan.infura.io/"+keyAPI;

const addressStudent = '0xfe893078af734b5bf258145b106e05b3814c91b5';
const addressTeacher = '0xb07f25a4baa33b72f26e252ba7f8fb70966b61b2';
const addressGroup = '0xf4e99f902fec6202a8a26c5d450181df896d21a5';
const addressJoin = '0xf50538542cf40022edb718f5603673a37d57186f';
const addressManage = '0xa9d20c302cc353e568c4e105c641dad10c7b4535';
const addressExam = '0x72a5dbf3f96103b1cc890008187731a8cb30cbc8';
const addressMake = '0xa00a75aadecc02842d09df7b2c9847263efb593e';
const addressDo = '0xa167f39ee5a4ffe808c9319cd1623b879dc2e93e';

const addressFrom = '0x5609c3ece14be63dff0bc314610990608bc6a7de';
const privateKey = '0xB75C5664625CADD6D18AAC559D54064310C4A82F8A90E7D61ECC61DAF5A9816F';

const gasPrice = '50000000000';
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
	var d = new Date();
	let date = d.toLocaleDateString().split('/');
	const year = date[2];
	const mounth = date[0].length > 1 ? date[0] : '0'+date[0];
	const day = date[1].length > 1 ? date[1] : '0'+date[1];
	let time = d.toLocaleTimeString().split(' ');
	let stamp = time[0].split(':');
	const hour = stamp[0].length > 1 ? stamp[0] : '0'+stamp[0];
	const minute = stamp[1].length > 1 ? stamp[1] : '0'+stamp[1];
	const second = stamp[2].length > 1 ? stamp[2] : '0'+stamp[2];
    console.log('['+year+'/'+mounth+'/'+day+'-'+time[1]+':'+hour+':'+minute+':'+second+']'+': '+data);
}

function getDate()
{
	var d = new Date();
	let date = d.toLocaleDateString().split('/');
	const year = date[2];
	const mounth = date[0].length > 1 ? date[0] : '0'+date[0];
	const day = date[1].length > 1 ? date[1] : '0'+date[1];
	time1 = year+'/'+mounth+'/'+day;
    return time1;
}

function getTime()
{
	var d = new Date();
	let time = d.toLocaleTimeString().split(' ');
	let stamp = time[0].split(':');
	const hour = stamp[0].length > 1 ? stamp[0] : '0'+stamp[0];
	const minute = stamp[1].length > 1 ? stamp[1] : '0'+stamp[1];
	const second = stamp[2].length > 1 ? stamp[2] : '0'+stamp[2];
    return time[1]+':'+hour+':'+minute+':'+second;
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
const abiExam = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "addExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "aw",
				"type": "uint256"
			}
		],
		"name": "addOrSetAnswerOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "nq",
				"type": "string"
			}
		],
		"name": "addOrSetQuestionOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "q",
				"type": "uint256"
			},
			{
				"name": "s",
				"type": "uint256"
			},
			{
				"name": "ns",
				"type": "string"
			}
		],
		"name": "addOrSetSelectionOfQuestionInExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "nn",
				"type": "string"
			}
		],
		"name": "editName",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "len",
				"type": "uint256"
			}
		],
		"name": "setLengthAnswerOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "len",
				"type": "uint256"
			}
		],
		"name": "setLengthQuestionOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "q",
				"type": "uint256"
			},
			{
				"name": "l",
				"type": "uint256"
			}
		],
		"name": "setLengthSelectionOfQuestionInExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "p",
				"type": "bool"
			}
		],
		"name": "setPublicOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "t",
				"type": "string"
			}
		],
		"name": "setTimeEndOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "t",
				"type": "string"
			}
		],
		"name": "setTimeStartOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "tp",
				"type": "string"
			}
		],
		"name": "setTypeOfExam",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "s",
				"type": "uint256"
			}
		],
		"name": "existQuestionOfExam",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "q",
				"type": "uint256"
			},
			{
				"name": "s",
				"type": "uint256"
			}
		],
		"name": "existSelectionOfQuestionInExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "existTimeEndOfExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "existTimeStartOfExam",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getAnswerOfExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getExistId",
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
		"name": "getExistName",
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
		"inputs": [
			{
				"name": "n",
				"type": "string"
			}
		],
		"name": "getIdOfExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getLengthAnswerOfExam",
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
		"inputs": [],
		"name": "getLengthExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getLengthQuestionOfExam",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "q",
				"type": "uint256"
			}
		],
		"name": "getLengthSelectionOfQuestionInExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getNameOfExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getPublicOfExam",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getQuestionOfExam",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "q",
				"type": "uint256"
			},
			{
				"name": "s",
				"type": "uint256"
			}
		],
		"name": "getSelectionOfQestionInExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTimeEndOfExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTimeStartOfExam",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTypeOfExam",
		"outputs": [
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
const abiMake = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "t",
				"type": "string"
			},
			{
				"name": "e",
				"type": "uint256"
			},
			{
				"name": "d",
				"type": "string"
			}
		],
		"name": "addMake",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "t",
				"type": "string"
			},
			{
				"name": "e",
				"type": "uint256"
			}
		],
		"name": "deleteMake",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "t",
				"type": "string"
			},
			{
				"name": "e",
				"type": "uint256"
			},
			{
				"name": "g",
				"type": "uint256"
			},
			{
				"name": "acc",
				"type": "bool"
			}
		],
		"name": "setAcceptGroupForExam",
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
				"type": "uint256"
			}
		],
		"name": "examExist",
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
				"name": "t",
				"type": "string"
			},
			{
				"name": "e",
				"type": "uint256"
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getAcceptGroupForExam",
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
				"name": "u",
				"type": "string"
			},
			{
				"name": "e",
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
		"name": "getExam",
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
		"name": "getLengthListExam",
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
				"name": "e",
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
				"name": "e",
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
	}
];
const abiDo = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "u",
				"type": "string"
			},
			{
				"name": "e",
				"type": "uint256"
			},
			{
				"name": "m",
				"type": "uint256"
			}
		],
		"name": "addMask",
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
		"name": "getExamInDo",
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
		"name": "getLengthExamInDo",
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
		"name": "getLengthUserInDo",
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
				"name": "e",
				"type": "uint256"
			}
		],
		"name": "getMark",
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
			},
			{
				"name": "g",
				"type": "uint256"
			}
		],
		"name": "getStatusInDo",
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
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getUserInDo",
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

module.exports = 
{
	keyAPI: keyAPI,

	httpProvider: httpProvider,

	addressStudent: addressStudent,
	addressTeacher: addressTeacher,
	addressGroup: addressGroup,
	addressJoin: addressJoin,
	addressManage: addressManage,
	addressExam: addressExam,
	addressMake: addressMake,
	addressDo: addressDo,
	
	addressFrom: addressFrom,
	privateKey: privateKey,

	abiStudent: abiStudent,
	abiTeacher: abiTeacher,
	abiGroup: abiGroup,
	abiJoin: abiJoin,
	abiManage: abiManage,
	abiExam: abiExam,
	abiMake: abiMake,
	abiDo: abiDo,

	gasPrice: gasPrice,
	gasLimit: gasLimit,

	createTransaction: transaction,
	infoTransaction: infoTransaction,
	getDate: getDate,
	getTime: getTime,
	log: log
}