var https = require("https");

module.exports = {
  index: function(req, res) {
    res.view({
      layout: '/layouts/mediascreen'
    });
  },

  blog: function (req, res) {
    https.get("https://flockler.com/api/sections/1992/articles?count=5", function(blog) {
      var body = '';
      blog.on('data', function(chunk) {
        body += chunk;
      });
      blog.on('end', function() {
        try {
          return res.json(JSON.parse(body));
          /*
          return res.json(_.map(employees, function(employee) {
            return _.pick(entries, 'first_name', 'last_name', 'portrait_thumb_url', 'email', 'phone1');
          }));
          */
        }
        catch(e) {
          return res.json(503, {'error': "Couldn't parse response."});
        }
      });
    }).on('error', function(e) {
      SystemEvent.add("ERROR", e);
      return res.json({'error': e});
    });
  },
};
