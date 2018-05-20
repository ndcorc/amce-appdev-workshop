"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

const MessengerSamples = require('botkit-messenger-samples');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "AddToWallet",
            "properties": {
                "cardImage": { "type": "string", "required": true },
            },
            "supportedActions": []
        };
    },

    invoke: (conversation, done) => {
        var cardImage = conversation.properties().cardImage;
        var logMsg = '\nAddToWallet\n______________________________________________________________\n'
        logMsg +=  '______________________________________________________________\n'+cardImage+'\n\n'
        console.log(logMsg);

        var MessageModel = conversation.MessageModel();

        var wallet_badge = "https://raw.githubusercontent.com/ndc466/image_bank/638df57e/ios_icons/add-to-apple-wallet-badge.png";
        var pkpass = "https://creditunionapi-gse00014110.uscom-east-1.oraclecloud.com/download.pkpass?cc="+cardImage;

        var title = "Add To Wallet";
        var imgUrl = wallet_badge;
        var action = MessageModel.urlActionObject(title , null, pkpass);
        var card = MessageModel.cardObject(title, null, imgUrl, null, [action]);
        var message = MessageModel.cardConversationMessage('horizontal', [card]);

        conversation.reply(message);
        conversation.keepTurn(false);
        conversation.transition();
        done();
        
    }
}
