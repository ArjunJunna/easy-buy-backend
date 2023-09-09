const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Token is not valid!');
     
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated!');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not alowed to do that!!!!!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
/*
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, userData) => {
      if (err) res.status(403).json('Token is not valid...');
      req.user = userData;
      console.log('req.user',req.user);
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated...');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log('req.user from vat',req.user);
      next();
    } else {
      res.status(403).json('You have no authorizaiton here..');
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  console.log('verify token adn admin  is alled');
  verifyToken(req, res, () => {
    console.log('answer',req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You have no authorizaiton here.');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
*/