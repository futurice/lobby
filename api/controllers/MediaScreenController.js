var request = require("request");
var S = require('string');

module.exports = {
  index: function(req, res) {
    res.view({
      layout: '/layouts/mediascreen'
    });
  },

  blog: function (req, res) {

    request("https://flockler.com/api/sections/1992/articles?count=30", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("done") // Show the HTML for the Google homepage.


        try {
          console.log("done");
          var json = JSON.parse(body).articles.map(function(article) {
            if (!article.summary) {
              article.summary = S(article.body).stripTags().unescapeHTML().s;
            }
            article.summary = S(article.summary).truncate(180).s;
            return article;
          });
          return res.json(json);
        }
        catch(e) {
          SystemEvent.add("ERROR", "Media screen: get blog: "+e);
          return res.json({'error': 'Couldnt parse response'});
        }
      }
      else {
        SystemEvent.add("ERROR", "Media screen: get blog: "+error);
        return res.json({'error': e});
      }
    });
  },
};
