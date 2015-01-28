module.exports = {
	getAll: function(req, res) {
		Ospacelog.find({},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            var cb =function(found,i){
                return function(err,user){
                    if (err){
                        return res.json(503,{err:"Error while retrieving userlog"});
                    }
                    found[i].user = user;
                    i++;
                    if (i<found.length){
                        User.findOne({id:found[i].userid},cb(found,i));
                    }
                    else{
                        return res.json(found);
                    }
                };
  
            };
            User.findOne({id:found[0].userid},cb(found,0))
        });
	},
	/*getDay:function(req, res) {
	    var now = new Date();
	    var d= new Date(now.getFullYear(),now.getMonth(),now.getDate());

		Ospacelog.find({time:{$gt:d.getTime()}},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},
	getWeek:function(req, res) {
		var now = new Date();
	    var d= new Date(new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime()-now.getDay()*86400000);

		Ospacelog.find({time:{$gt:d.getTime()}},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},
	getMonth:function(req, res) {
	    var now = new Date();
	    var d= new Date(now.getFullYear(),now.getMonth());

		Ospacelog.find({time:{$gt:d.getTime()}},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            return res.json(found);
        });
	},*/
};
