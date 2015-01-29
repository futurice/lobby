module.exports = {
	getAll: function(req, res) {
		Log.find({},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving logs"});
            }
            return res.json(found);
        });
	},

	create: function(req, res) {
		console.log(req.params.all);
	}
};