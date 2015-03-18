var https = require("https");

module.exports = {
  index: function(req, res) {
    res.view({
      layout: '/layouts/mediascreen'
    });
  },

  blog: function (req, res) {
    https.get("https://flockler.com/api/sections/1992/articles?count=8", function(blog) {

      var body = '';
      blog.on('data', function(chunk) {
        body += chunk;
      });
      blog.on('end', function() {
        try {
          return res.json(JSON.parse(body));
        }
        catch(e) {
          SystemEvent.add("ERROR", "Media screen: couldn't parse response. "+e);
          return res.json(503, {'error': "Couldn't parse response."});
        }
      });
    }).on('error', function(e) {
      SystemEvent.add("ERROR", "Media screen: get blog: "+e);
      return res.json({'error': e});
    });
  },
};
