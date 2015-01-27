module.exports = {
	getAll: function(req, res) {
		User.find({},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},
	getDay:function(req, res) {
	    var now = new Date();
	    var d= new Date(now.getFullYear(),now.getMonth(),now.getDate());

		User.find({time:{&gt:d.getTime()}},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},
	getWeek:function(req, res) {
		var now = new Date();
	    var d= new Date(new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime()-now.getDay()*86400000);

		User.find({time:{&gt:d.getTime()}},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},
	getMonth:function(req, res) {
	    var now = new Date();
	    var d= new Date(now.getFullYear(),now.getMonth());

		User.find({time:{&gt:d.getTime()}},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},
};
