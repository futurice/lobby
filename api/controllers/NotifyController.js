module.exports = {
  /**
   * `NotifyController.notify()`
   */
  notify: function(req, res){
  	if(req.body.type==="flowdock"){
  		var session = new sails.flowdock.Session("9d6386bafaa7bdaed8125e58572ee749");
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