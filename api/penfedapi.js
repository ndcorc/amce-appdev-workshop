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

  const url = "/mobile/custom/PenFedAPI";

  /**
   *  Loans Collection
   */
	service.get(url+'/loans', function(req, res) {
		var result = {};
    var statusCode = 200;
    req.oracleMobile.storage.getAll('Loans')
      .then(function (result) {
          var data = JSON.parse(result.result);
          return data.items;
      })
      .then(function (result) {
        var loans = [];
        var itemsProcessed = 0;
        result.forEach((item, index, items) => {
          req.oracleMobile.storage.getById("Loans", item.id)
            .then(function (result) {
              itemsProcessed ++;
              obj = JSON.parse(result.result);
              obj['mcsId'] = item.id;
              loans.push(obj);
              if (itemsProcessed === items.length) { res.send(200, loans); }
            });
        });
      });
  });

	service.get(url+'/loans/:id', function(req, res) {
		var result = {};
    var statusCode = 201;
    req.oracleMobile.storage.getById("Loans", req.params.id)
      .then(function (result) {
        var loan = JSON.parse(result.result);
        loan['mcsId'] = req.params.id;
        res.send(200, loan);
      });
  });
  
	service.post(url+'/loans', function(req, res) {
		var result = {};
    var statusCode = 201;
    var notification = {
      message: req.body.notification.message.message,
      tag: req.body.notification.message.subject,
      notificationTokens:[req.body.notification.token]
    };
    var context = {
      mbe: req.oracleMobile.mbe.getMBE().name,
      version: req.oracleMobile.mbe.getMBE().version
    };
    delete req.body.notification;
    req.oracleMobile.storage.store('Loans', JSON.stringify(req.body))
      .then(result => {
        req.oracleMobile.notification.post(notification, context)
          .then(notifyResult => {
            var data = JSON.parse(result.result);
            res.send(200, data);
          },
          error => {
            res.send(400, JSON.parse(error.error));
          })
      },
      error => {
        res.send(400, JSON.parse(error.error));
      })
  });
  /**
   *  Update Loan Notificaiton Profile w/ Push Notification
   *  a) Update Profile Info
   *  b) Notify Dealer ~ New Message to Dealer
   *  c) Update Loan Status
   */
	service.put(url+'/loans/:id', function(req, res) {
		var result = {};
    var statusCode = 201;
    var notification, context;
    if (req.body.notification) {
      notification = {
        message: req.body.notification.message.message,
        tag: req.body.notification.message.subject,
        notificationTokens:[req.body.notification.token]
      };
      context = {
        mbe: req.oracleMobile.mbe.getMBE().name,
        version: req.oracleMobile.mbe.getMBE().version
      };
      delete req.body.notification;
    }
    req.oracleMobile.storage.storeById('Loans', req.params.id, JSON.stringify(req.body))
      .then(result => {
        if (notification) {
          req.oracleMobile.notification.post(notification, context)
            .then(result => {
              var data = JSON.parse(result.result);
              res.send(200, data);
            },
            error => {
              res.send(400, JSON.parse(error.error));
            })
        }
        res.send(200, JSON.parse(result.result));
      },
      error => {
        res.send(400, JSON.parse(error.error));
      })
  });
  /**
   *  Delete Loan Notificaiton Profile w/ Push Notification
   */
	service.delete(url+'/loans/:id', function(req, res) {
		var result = {};
    var statusCode = 201;
    /*var notification = {
      message: "Notification profile for Loan has been deleted.",
      tag: "Loan Profile Deleted",
      notificationTokens:[req.body.notification.token]
    };
    var context = {
      mbe: req.oracleMobile.mbe.getMBE().name,
      version: req.oracleMobile.mbe.getMBE().version
    };*/
    req.oracleMobile.storage.remove('Loans', req.params.id)
      .then(result => {
        res.send(200, JSON.parse(result.result));
      },
      error => {
        res.send(400, JSON.parse(error.error));
      })
  });



  /**
   * 
   * 
   *  Dealers Collection
   * 
   * 
   */
	service.get(url+'/dealers', function(req, res) {
		var result = {};
    var statusCode = 200;
    req.oracleMobile.storage.getById("Dealers", "b19ec240-dfcc-4e40-9a7b-686f14619114")
      .then(function (result) {
        res.send(200, result.result);
      });
  });
  
	service.post(url+'/dealers', function(req, res) {
		var result = {};
    var statusCode = 201;
    var dealer = {
      "name": "Nolan Corcoran",
      "token": req.body.notificationToken,
      "notifications": []
    }
    req.oracleMobile.devices.register(req.body)
      .then(result => {
        req.oracleMobile.storage.storeById('Dealers', "b19ec240-dfcc-4e40-9a7b-686f14619114", JSON.stringify(dealer))
          .then(result => {
            var data = JSON.parse(result.result);
            res.send(200, result.result);
          },
          error => {
            res.send(400, error.error);
          })
      },
      error => {
        res.send(400, error.error);
      });
  });

	service.put(url+'/dealers', function(req, res) {
		var result = {};
    var statusCode = 201;
    var notification = req.body;
    req.oracleMobile.storage.getById("Dealers", "b19ec240-dfcc-4e40-9a7b-686f14619114")
      .then(function (result) {
        return result.result;
      })
      .then(dealer => {
        dealer.notifications.push(notification);
        req.oracleMobile.storage.storeById('Dealers', "b19ec240-dfcc-4e40-9a7b-686f14619114", JSON.stringify(dealer))
          .then(result => {
            res.send(200, result.result);
          },
          error => {
            res.send(400, error.error);
          })
      });
  });
};
