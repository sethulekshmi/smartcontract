/*eslint-env node*/
var fs = require('fs');
var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../../tools/traces/trace.js');
var crypto = require('crypto');

/*
Used to manually deploy vehicle chaincode.
Not used for Bluemix demo which instead uses "\Server_Side\configurations\startup\CRUD\create.js" to automatically deploy chaincode.
*/
function deploy(req, res)
{
	
	tracing.create('ENTER', 'POST blockchain/chaincode/vehicles', {})
	configFile = reload(__dirname+'/../../../../configurations/configuration.js');
	
	var api_url = configFile.config.api_ip+":"+configFile.config.api_port_internal
	    api_url = api_url.replace('http://', '')
	    
    var randomVal = crypto.randomBytes(256).toString('hex')
				
	
				
				
	var deploySpec = {
						  "jsonrpc": "2.0",
						  "method": "deploy",
						  "params": {
						    "type": 1,
						    "chaincodeID": {
						      "path": configFile.config.asset
						    },
						    "ctorMsg": {
						      "function": "init",
						      "args": [
						        api_url, randomVal
						      ]
						    },
						    "secureContext": "Kollur"
						  },
						  "id": 12
						}
									
	var options = 	{
						url: configFile.config.api_ip+":"+configFile.config.api_port_external+'/chaincode',
						method: "POST", 
						body: deploySpec,
						json: true
					}
	
	request(options, function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			
			setTimeout(function() {
				tracing.create('INFO', 'POST blockchain/chaincode/assets', 'Chaincode deployed. Writing to config.')
				update_config(body.result.message, res)
			}, 60000);
		}
		else
		{
			res.status(400)
			var error = {}
			error.message = "Unable to deploy chaincode"
			error.error = true
			res.send(error)
		}
	})
}

function update_config(name, res) //Updates config.assets_name (ID of Chaincode) depending on chaincode provided
{

	configFile = reload(__dirname+'/../../../../configurations/configuration.js');
	fs.readFile(__dirname+'/../../../../configurations/configuration.js', 'utf8', function (err,data)
	{
		if (err)
		{
			return console.log(err);
		}

		var toMatch = "config.asset_name = '"+ configFile.config.asset_name+"';"
		var re = new RegExp(toMatch, "g")

		var result = data.replace(re, "config.asset_name = '"+name+"';");

		fs.writeFile(__dirname+'/../../../../configurations/configuration.js', result, 'utf8', function (err)
		{
			if (err)
			{	
				res.status(400)
				var error = {}
				error.message = "Unable to write chaincode deploy name to configuration file"
				error.error = true;
				tracing.create('ERROR', 'POST blockchain/chaincode/assets', error)
				res.send(error)
			}
			else
			{
				tracing.create('EXIT', 'POST blockchain/chaincode/assets', {"message":name})
				res.send({"message":name})
			}			
		});
	});
}

exports.create = deploy;

