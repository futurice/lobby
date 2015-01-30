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
};