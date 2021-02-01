const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('auth-token');

  //Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ status: 'fail', msg: 'No token, authorization denied' });
  }

  try {
    //entrie payload
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', msg: 'Token is not valid' });
  }
};
