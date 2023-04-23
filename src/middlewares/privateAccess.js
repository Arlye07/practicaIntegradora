function privateAccess(req, res, next) {
    if (!req.session.user) return res.redirect('/api/register')
  
    next()
  }
  
  module.exports = privateAccess