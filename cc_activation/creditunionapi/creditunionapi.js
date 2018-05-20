/**
 * The ExpressJS namespace.
 * @external ExpressApplicationObject
 * @see {@link http://expressjs.com/3x/api.html#app}
 */ 

/**
 * Mobile Cloud custom code service entry point.
 * @param {external:ExpressApplicationObject}
 * service 
 */
module.exports = function(service) {


	/**
	 *  The file samples.txt in the archive that this file was packaged with contains some example code.
	 */

	var httpOptions = {
		"username": "harsh.narendra.patel@oracle.com",
		"password": "Chatbot@123"
	}

	function getRandomDigits() {
		var code = ""
		for (var i = 0; i < 6; i++) {
			var number = Math.floor(Math.random() * Math.floor(10));
			code += number.toString();
		}
		return code;
	}

	service.post('/mobile/custom/CreditUnionAPI/read_card', function(req,res) {
		var result = {};
		var statusCode = 201;
		res.status(statusCode).send(result);
	});

	service.get('/mobile/custom/CreditUnionAPI/download_pkpass', function(req,res) {
		var result = {};
		var statusCode = 200;
		res.status(statusCode).send(result);
	});

	service.get('/mobile/custom/CreditUnionAPI/check_mobile', function(req,res) {
		var result = {};
		var statusCode = 200;

		var mobile = req.query.mobile;
		
		req.oracleMobile.storage.getById(
			"UserData",
			"9c295200-5f1a-4ac3-a546-8f3fc74e3d9e",
			null,
			httpOptions
		).then(
			function(result) {
				var users = JSON.parse(result.result);
				if (mobile in users) {
					auth_code = getRandomDigits();
					users[mobile]['authCode'] = auth_code;
					
				}

				console.log(result);
				res.send(result.statusCode, JSON.parse(result.result));
			},
			function (error) {
				res.send(error.statusCode, error.error);
			}
		);
		
		//res.status(statusCode).send(result);
	});

	service.get('/mobile/custom/CreditUnionAPI/check_card', function(req,res) {
		var result = {};
		var statusCode = 200;
		res.status(statusCode).send(result);
	});

	service.get('/mobile/custom/CreditUnionAPI/get_images', function(req,res) {
		var result = {};
		var statusCode = 200;
		res.status(statusCode).send(result);
	});

};
