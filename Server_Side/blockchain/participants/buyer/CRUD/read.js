/*eslint-env node */

var tracing = require(__dirname+'/../../../../tools/traces/trace.js');
var reload = require('require-reload')(require),
    participants = reload(__dirname+'/../../participants_info.js');

var read = function(req, res)
{
	participants = reload(__dirname+'/../../participants_info.js');
	tracing.create('ENTER', 'GET blockchain/participants/buyer', {});
	
	if(!participants.participants_info.hasOwnProperty('buyers'))
	{
		res.status(404)
		var error = {}
		error.message = 'Unable to retrieve buyers';
		error.error = true;
		tracing.create('ERROR', 'GET blockchain/participants/buyer', error);
		res.send(error)
	} 
	else
	{
		tracing.create('EXIT', 'GET blockchain/participants/buyer', {"result":participants.participants_info.buyers});
		res.send({"result":participants.participants_info.buyers})
	}
}
exports.read = read;