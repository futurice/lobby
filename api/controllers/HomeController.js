module.exports = {
    index: function(req, res) {
        res.view({
            currentUser: req.user,
            locales: sails.config.i18n.locales,
            layout: '/layouts/internal'
        });
    }
};
