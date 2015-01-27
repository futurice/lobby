module.exports = {
	getAll: function(req, res) {
		User.find({},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userdata"});
            }
            return res.json(found);
        });
	},


    checkin: function(req, res) {
		User.findOne({phone:req.param('phone')},function(err,found){
            if (!err && found != undefined){
				var d= new Date();
			    var oslog = {userid:found.id,time: d.getTime(),comment:req.param("comment")};
			    Ospacelog.create(oslog);
				User.update({id:found.id},{last_seen:d.getTime()},function(err,found){
					if (err){
						console.log(err);
					}
					else{
						console.log(found);
					}						
				});
                return res.json(found);
            }
            return res.json(404,{err:"User not found"});
        });
    },

	create: function (req, res) {
        var d= new Date();
		var model = {
			email: req.param('email'),
			first_name: req.param('first_name'),
            last_name: req.param('last_name'),
            phone: req.param('phone'),
			last_seen: d.getTime(),
		};
		

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return res.json(503,{err:"User creation failed for unknown reason"})
			}
			else {
			    var d= new Date();
			    var oslog = {userid:model.id,time: d.getTime(),comment:req.param("comment")};
			    Ospacelog.create(oslog);
			    return res.json({msg:"user created successfully!"})
			}
		});
	}
};
