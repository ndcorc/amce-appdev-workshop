"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "CheckCard",
            "properties": {
                "phoneNumber": { "type": "string", "required": true },
                "cardNumber": { "type": "string", "required": true },
                "cvc": { "type": "string", "required": true },
            },
            "supportedActions": [ "valid", "invalid" ]
        };
    },

    invoke: (conversation, done) => {
        var phoneNumber = conversation.properties().phoneNumber;
        var cardNumber = conversation.properties().cardNumber;
        cardNumber = cardNumber.substr(cardNumber.length-4);
        var cvc = conversation.properties().cvc;
        logger.debug('CheckCode: checking for user with cardNumber having the last four digits: ' + cardNumber);

        var options = { 
            method: 'GET',
            url: 'https://creditunionapi-gse00014110.uscom-east-1.oraclecloud.com/check_card?mobile=' + phoneNumber + '&cardNumber=' + cardNumber + '&cvc=' + cvc,
        };
        console.log('https://creditunionapi-gse00014110.uscom-east-1.oraclecloud.com/check_card?mobile=' + phoneNumber + '&cardNumber=' + cardNumber + '&cvc=' + cvc);

        request(options, function (err, res, body) {
            if (err) throw new Error(err);
            console.log(body);
            var data = JSON.parse(body);
            if (data.success) {
                var card_image = data.message["cc_image"];
                conversation.variable("cardImage", card_image);
                conversation.transition("valid");
            } else {
                conversation.transition("invalid");
            }
            done();
        });
    }
};
