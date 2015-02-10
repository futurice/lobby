var https = require('https');
var qs = require('querystring');
var _ = require('lodash');

module.exports = {
  /**
   * `NotifyController.notify()`
   */
  notify: function(req, res) {
    console.log("notify");
	if (req.body.type === "sms") {
      //TODO validate number / only pass user id here?
      if (!req.body.recipient) {
        return res.json({'error': 'Invalid recipient'});
      }

      var params = qs.stringify({
        to: req.body.recipient,
        text: req.body.message, //'You have a visitor in Futurice lobby',
        username: sails.config.futurice.sms_user,
        password: sails.config.futurice.sms_password
      });
	console.log(sails.config.futurice.sms_user);
	console.log(sails.config.futurice.sms_password);
	console.log(req.body.recipient);
	console.log(req.body.message);
	console.log(params);
      https.get("https://backupmaster2.futurice.com:13013/cgi-bin/sendsms?" + params, function(sms) {
        var body = '';
        sms.on('data', function(chunk) {
          body += chunk;
        });
        sms.on('end', function() {
          if ([200,201,202].indexOf(sms.statusCode) != -1) {
            return res.json({status: 'Message sent.'});
          };
          return res.json({'error': '?'});
        });
      }).on('error', function(e) {
        return res.json({'error': e});
      });
    }

  	else if (req.body.type==="flowdock") {
		console.log(sails.config.futurice.flowdock_key);
  		var session = new sails.flowdock.Session(sails.config.futurice.flowdock_key);
  		var users = session.get(
  			'/users', "",
  			function (err, flow, response){
  				if(err)
  					console.log(err)
  				else if (response) {
			      var users = response.body;
			      var user = users.filter(function(usr){
			         return usr.email==="miki.tolonen@gmail.com"
			      })[0];
			      if(!user){
			         console.log("User not found");
			         return
			      }
			      session.privateMessage(user.id, req.body.message);
			      res.ok("Sent message to : " + user.name);		   		}
				}
			);
		}
	}
};
