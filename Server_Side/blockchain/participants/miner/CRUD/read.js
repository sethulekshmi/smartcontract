/*eslint-env node*/

var tracing = require(__dirname+'/../../../../tools/traces/trace.js');
var reload = require('require-reload')(require),
	participants = reload(__dirname+'/../../participants_info.js');

var read = function(req, res)
{
	participants = reload(__dirname+'/../../participants_info.js');
	tracing.create('ENTER', 'GET blockchain/participants/miner', {});
	
	if(!participants.participants_info.hasOwnProperty('miners'))
	{
		res.status(404)
		var error = {}
		error.message = 'Unable to retrieve miners';
		error.error = true;
		tracing.create('ERROR', 'GET blockchain/participants/miner', error);
		res.send(error)
	} 
	else
	{
		tracing.create('EXIT', 'GET blockchain/participants/miner', {"result":participants.participants_info.miners});
		res.send({"result":participants.participants_info.miners})
	}
}
exports.read = read;