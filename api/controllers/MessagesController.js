
module.exports = {

  find: function(req, res) {
    Message.getAll().spread(function(models) {
      Message.watch(req);

      //  Message.watch(req.socket, models);
      //  Message.subscribe(req.socket, models);
      //  Message.subscribe(req.socket,models,['create','destroy','update']);
      Message.subscribe(req.socket,models);

      res.json({data: models});
    })
    .fail(function(err) {
      // An error occured
      SystemEvent.add("ERROR", err);
      res.json(err);
    });
  },

  getAll: function(req, res) {
    Message.getAll().spread(function(models) {

      Message.watch(req);
      Message.subscribe(req.socket,models);

      console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'messages\'.');
      res.json({data: models});
    })
    .fail(function(err) {
      // An error occured
      SystemEvent.add("ERROR", err);
    });
  },
  getOne: function(req, res) {
    Message.getOne(req.param('id')).spread(function(model) {
      Message.subscribe(req.socket, model);
      console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'messages\'.');
      res.json(model);
    })
    .fail(function(err) {
      SystemEvent.add("ERROR", err);
      res.send(404);
    });
  },

  create: function (req, res) {
    var params = req.params.all()
    var model = {
      title:params.header,
      description:params.body
    }
    // Calculate visibility time
    var d = new Date();
    model.visibleUntil = d.getTime() + params.visibility; // If d.getTime() gives time in milliseconds?

    // TODO: upon message creation, how to populate the user here, so the associated user gets sent back as a property of the message
    Message.create(params).exec(function(err, model) {
      if (err) {
        SystemEvent.add("ERROR", err);
        return console.log(err);
      }
      else {
        // publish create to subscribers
        Message.publishCreate(model);
        res.json(model);
      }
    });
  },

  update: function (req, res, next) {
    var id = req.param("id");
    var status = req.param("status");
    var title = req.param("title");
    isComplete = (status === 4) ? true : false;
    if (status && title && req.isSocket) {
      Message.update(id, {status: status, title: title ,isComplete:isComplete}).exec(function update(err, updated) {
        Message.publishUpdate(updated[0].id, { status: updated[0].status, title: updated[0].title });
      })
    }
    else {
      if (status && req.isSocket) {
        Message.update(id, {status: status,isComplete:isComplete }).exec(function update(err, updated) {
            Message.publishUpdate(updated[0].id, { status: updated[0].status });
        })
      }
    }
  },

  destroy: function (req, res) {
    var id = req.param('id');
    if (!id) {
      return res.badRequest('No id provided.');
    }

    // Otherwise, find and destroy the model in question
    Message.findOne(id).exec(function(err, model) {
      if (err) {
        SystemEvent.add("ERROR", err);
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
      Message.destroy(id, function(err) {
        if (err) {
          SystemEvent.add("ERROR", err);
          return res.serverError(err);
        }
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'Message destroy \'.',model.id);
        Message.publishDestroy(model.id);
        return res.json(model);
      });
    });
  }
};