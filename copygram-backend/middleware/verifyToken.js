var jwt = require('jsonwebtoken');
var admin = require('../dbpasswords');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if(!token) return res.status(401).json({error: 'token neads to be provided'});

  jwt.verify(token, admin.secret, function(error, decoded) {
    if(error) return res.status(500).json({error: 'error during authentification of token'});
    req.userId = decoded.id;
    console.log(decoded.id);
    next();
  });
}

module.exports = verifyToken;
