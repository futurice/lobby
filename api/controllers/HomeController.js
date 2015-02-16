
module.exports = {
	index: function(req, res) {
		res.view({
      locales: sails.config.i18n.locales,
      layout: '/layouts/internal'
		});
	}
};