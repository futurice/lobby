module.exports = {
    create: function (req, res) {
        console.log(req.params.all());
        var model = {
            comments: req.param('comments')
        };

        Feedback.create(model)
        .exec(function(err, model) {
            if (err) {
                SystemEvent.add("ERROR", "Feedback create: "+err);
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
                SystemEvent.add("ERROR", "Feedback getAll: "+err);
                return res.json(503,{err:"Error while retrieving feedback"});
            }
            return res.json(found);
        });
    }
};