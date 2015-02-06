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
                return res.json(found);
            }
            return res.json(404,{err:"User not found"});
        });
    },

	create: function (req, res) {
        console.log(req.params.all());
		var model = {
			email: req.param('email'),
			first_name: req.param('first_name'),
            last_name: req.param('last_name'),
            phone: req.param('phone')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};
