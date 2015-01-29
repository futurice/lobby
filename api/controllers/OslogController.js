module.exports = {
	getAll: function(req, res) {
		Ospacelog.find({},function(err,found){
            //return if error occurs while fetching log
            if (err){
                return res.json(503,{err:"Error while retrieving userlog"});
            }
            
            /*Callback that  matches every log entry to a corresponding user*/
            var cb =function(found,i){
                //"callback" retuns actual callback given to findOne function
                return function(err,user){
                    if (err){
                        return res.json(503,{err:"Error while retrieving userlog"});
                    }

                    found[i].user = user;
                    i++;

                    //if user wasnt last, fetch next.
                    if (i<found.length){
                        User.findOne({id:found[i].userid},cb(found,i));
                    }
                    //all users fetched. return.
                    else{
                        return res.json(found);
                    }
                };
  
            };
            //return empty JSON if there is no log entries
            if (!found.length){
                return res.json({});
            }
            //start combining users to log entries
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
