"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {


    metadata: function metadata() {
        return {
            "name": "CreditCardImages",
            "properties": {
				"phoneNumber": { "type": "string", "required": true }
			},
            "supportedActions": []
        };
    },

    invoke: (conversation, done) => {

		var phoneNumber = conversation.properties().phoneNumber;

		var options = { 
			method: 'GET',
			url: 'https://creditunionapi-gse00014110.uscom-east-1.oraclecloud.com/get_images?mobile=' + phoneNumber,
		};
		
		request(options, function (err, res, body) {
			if (err) throw new Error(err);
			var logMsg = '\nCreditCardImages\n______________________________________________________________\n'
            logMsg +=  '______________________________________________________________\n'+body+'\n\n'
            console.log(logMsg);
			var data = JSON.parse(body);
			if (data.success) {
				var MessageModel = conversation.MessageModel();
				var img_nums = data.img_nums;
				var cc_nums = data.cc_nums;
				
				var cards = [];
				for (var i=0; i<img_nums.length; i++) {
					var title = "Select this Card"
					var url = "https://raw.githubusercontent.com/ndc466/image_bank/master/credit_cards/" + img_nums[i];
					var action = MessageModel.postbackActionObject(cc_nums[i], null, cc_nums[i]);
					var card = MessageModel.cardObject(title, null, url, null, [action])
					cards.push(card)
				}
				var message = MessageModel.cardConversationMessage('horizontal', cards);
				conversation.reply(message);
				conversation.keepTurn(true);
				conversation.transition(true);   
			} else {
				conversation.reply({"text": "There seems to have been a problem."})
				conversation.transition();
			}
			done();
		});
		
    }
};
