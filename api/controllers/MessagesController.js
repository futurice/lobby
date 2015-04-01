var _ = require('lodash');

module.exports = {

  find: function(req, res) {
    Message.find().spread(function(models) {
      console.log(req.socket.id, 'subscribed to all of the model instances in \'messages\'.');
      Message.watch(req);
      Message.subscribe(req.socket, models, ['create','destroy','update']);
      res.json(models);
    })
    .fail(function(err) {
      // An error occured
      SystemEvent.add("ERROR", err);
      res.json(err);
    });
  },

  getOne: function(req, res) {
    Message.getOne(req.param('id')).spread(function(model) {
      Message.subscribe(req.socket, model);
      res.json(model);
    })
    .fail(function(err) {
      SystemEvent.add("ERROR", err);
      res.send(404);
    });
  },

  create: function (req, res) {
    var params = _.pick(req.params.all(),
      'title', 'description', 'visibilityTime', 'forceVisible', 'eventTime');
    var d = new Date();
    console.log("visll", params);

    d.setMilliseconds(d.getMilliseconds() + params.visibilityTime);
    params.visibleUntil = d;

    Message.create(params).exec(function(err, model) {
      if (err) {
        SystemEvent.add("ERROR", err);
        console.log(err)
        return res.json(422, err);
      }
      else {
        // publish create to subscribers
        Message.publishCreate(model);
        console.log("msg publish create", model);
        return res.json(model);
      }
    });
  },

  update: function (req, res, next) {
    var params = req.params.all();
    var id = req.param("id");
    Message.update(params.id, params).exec(function update(err, updated) {
      if (err) {
        res.json(422, err);
      }
      else {
        Message.publishUpdate(updated[0].id, updated[0]);
        res.json(updated);
      }
    });
  },

  delete: function (req, res) {
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

      Message.destroy(id, function(err) {
        if (err) {
          SystemEvent.add("ERROR", err);
          return res.serverError(err);
        }
        Message.publishDestroy(model.id);
        return res.json(model);
      });
    });
  }
};