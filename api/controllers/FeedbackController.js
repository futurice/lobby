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
	}
};