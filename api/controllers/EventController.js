module.exports = {

    find: function(req, res) {
        Event.getAll().spread(function(models) {
                Event.watch(req);

                //  Event.watch(req.socket, models);
                //  Event.subscribe(req.socket, models);
                //  Event.subscribe(req.socket,models,['create','destroy','update']);
                Event.subscribe(req.socket, models);

                res.json({
                    data: models
                });
            })
            .fail(function(err) {
                // An error occured
                res.json(err);
            });
    },

    getAll: function(req, res) {
        Event.getAll().spread(function(models) {

                //Event.autosubscribe();
                Event.watch(req);
                Event.subscribe(req.socket, models);

                console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'todos\'.');
                res.json({
                    data: models
                });
            })
            .fail(function(err) {
                // An error occured
            });
    },
    getOne: function(req, res) {
        Event.getOne(req.param('id')).spread(function(model) {
                Event.subscribe(req.socket, model);
                console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'todos\'.');
                res.json(model);
            })
            .fail(function(err) {
                res.send(404);
            });
    },

    create: function(req, res) {
        var userId = req.param('user');
        var model = {
            title: req.param('title'),
            status: req.param('status'),
            user: userId
        };

        // TODO: upon message creation, how to populate the user here, so the associated user gets sent back as a property of the message
        Event.create(model).exec(function(err, model) {
            if (err) {
                return console.log(err);
            } else {
                console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model create in \'todos\'.');
                Event.publishCreate(model);
                res.json(model);
            }
        });
    },

    update: function(req, res, next) {
        var id = req.param("id");
        var status = req.param("status");
        var title = req.param("title");
        isComplete = (status === 4) ? true : false;
        if (status && title && req.isSocket) {
            Event.update(id, {
                status: status,
                title: title,
                isComplete: isComplete
            }).exec(function update(err, updated) {
                Event.publishUpdate(updated[0].id, {
                    status: updated[0].status,
                    title: updated[0].title
                });
            });
        } else {
            if (status && req.isSocket) {
                Event.update(id, {
                    status: status,
                    isComplete: isComplete
                }).exec(function update(err, updated) {
                    Event.publishUpdate(updated[0].id, {
                        status: updated[0].status
                    });
                });
            }
        }
    },

    destroy: function(req, res) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        // Otherwise, find and destroy the model in question
        Event.findOne(id).exec(function(err, model) {
            if (err) {
                return res.serverError(err);
            }
            if (!model) {
                return res.notFound();
            }
            /*
            Audit.create(model)
                .exec(function (err, todo) {
                    if (err) {
                        return console.log(err);
                    }
                    else {

                    }
                });
            */
            Event.destroy(id, function(err) {
                if (err) {
                    return res.serverError(err);
                }
                console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'Event destroy \'.', model.id);
                Event.publishDestroy(model.id);
                return res.json(model);
            });
        });
    }
};
