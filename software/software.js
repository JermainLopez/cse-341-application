module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureAuthor: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/dashboard');
        }
    },
}