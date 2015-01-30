module.exports = {
	create: function (req, res) {
        console.log(req.params.all());
        var d = new Date();
		var model = {
			date: d.toString(),
			comments: req.param('comments')
		};

		Feedback.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				Feedback.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	},

	getAll: function (req, res) {
		Feedback.find({},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userdata"});
            }
            return res.json(found);
        });
	}
};