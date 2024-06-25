const isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: 'Not Authorized'});
  } else {
    next();
  }
}

module.exports = isAuth;