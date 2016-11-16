/*eslint-env node */
var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../../../tools/traces/trace.js');
var map_ID = require(__dirname+'/../../../../../tools/map_ID/map_ID.js');

var user_id;

var read = function (req,res)
{	
	var assetID = req.params.assetID;
	
	tracing.create('ENTER', 'GET blockchain/assets1/assets/asset/'+assetID, {});
    configFile = reload(__dirname+'/../../../../../configurations/configuration.js');
	if(typeof req.cookies.user != "undefined")
	{
		req.session.user = req.cookies.user;
		req.session.identity = map_ID.user_to_id(req.cookies.user);
	}		

	user_id = req.session.identity

	var querySpec =					{
										"jsonrpc": "2.0",
										"method": "query",
										"params": {
										    "type": 1,
											"chaincodeID": {
												"name": configFile.config.asset_name
											},
											"ctorMsg": {
											  "function": "get_asset_details",
											  "args": [
											  		assetID
											  ]
											},
											"secureContext": user_id
										},
										"id": 123
									};
									


	var options = 	{
					url: configFile.config.api_ip+':'+configFile.config.api_port_external+'/chaincode',
					method: "POST", 
					body: querySpec,
					json: true
				}
	
	request(options, function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var result = {}
			result.vehicle = JSON.parse(body.result.message);
			tracing.create('EXIT', 'GET blockchain/assets1/assets/asset/'+assetID, result);
			res.send(result.asset)
		}
		else 
		{
			res.status(400)
			tracing.create('ERROR', 'GET blockchain/assets1/assets/asset/'+assetID , 'Unable to get asset. assetID: '+ assetID)
			var error = {}
			error.message = 'Unable to read asset'
			error.v5cID = v5cID;
			error.error = true;
			tracing.create('ERROR', 'GET blockchain/assets1/assets/asset/'+assetID, error);
			res.send(error)
		}
	});
}

exports.read = read;
