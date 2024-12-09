const auth = (req, res, next) => {
  if (req.session.userId || req.session.isAdmin) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

const adminAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Admin access required');
  }
};

module.exports = { auth, adminAuth };