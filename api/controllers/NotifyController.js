var https = require('https');
var qs = require('querystring');
var _ = require('lodash');
var request = require('request');

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
        to: sails.config.futurice.sms_override_number ? sails.config.futurice.sms_override_number : req.body.recipient,
        text: req.body.message, //'You have a visitor in Futurice lobby',
        username: sails.config.futurice.sms_user,
        password: sails.config.futurice.sms_password
      });
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
      https.get(sails.config.futurice.sms_url + "?" + params, function(sms) {
        var body = '';
        sms.on('data', function(chunk) {
          body += chunk;
        });
        sms.on('end', function() {
          if ([200,201,202].indexOf(sms.statusCode) != -1) {
            SystemEvent.add("SMS message", "Message sent to: "+params.to);
            console.log("SMS Message sent with these parameters: " + params);
            return res.json({status: 'Message sent.'});
          };
          SystemEvent.add("ERROR", "Sending SMS message: sms.on 'end' unknown error");
          return res.json({'error': '?'});
        });
      }).on('error', function(e) {
        SystemEvent.add("ERROR", "Sending SMS message: "+e);
        console.log("Error while sending sms message: " +e);
        return res.json({'error': e});
      });
    } else if (req.body.type==="flowdock") {
      console.log(sails.config.futurice.flowdock_key);
      var session = new sails.flowdock.Session(sails.config.futurice.flowdock_key);
      request.post(
        'https://api.flowdock.com/v1/messages/chat/'+sails.config.futurice.flowdock_flow_api_key,
        {form:{'external_user_name':'lobby','content':req.body.message,'tags': ""}},
        function (error, response, body) {
          console.log("in the request")
          if(error) {
            SystemEvent.add("ERROR", "Sending Flowdock message: "+error);
            console.log(error);
          } else {
            SystemEvent.add("Flowdock message", "Flowdock message ok: "+response+" "+body);
            console.log(body);
            console.log(response);
          }
        }
      );
      return res.json({status: 'OK'})
      //this is for sending messages to single person
      /*
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
       );*/
    }
  }
};
