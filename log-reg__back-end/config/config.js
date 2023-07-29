const rateLimit = require("express-rate-limit");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const queryParameterize = /^[A-Za-z0-9]+$/;

const uniqueArray = arr => {
  const uniqueArr = arr.reduce((acc, curr) => {
    const marka = curr.marka;
    if (!acc.some(obj => obj.marka === marka)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return uniqueArr;
};


const generateRandomNumber = () => Math.floor(Math.random() * (15999 - 15000 + 1)) + 15000;

const limiter = rateLimit({
    windowMs: 15*60*1000,   //15 minutes
    max: 99,                // limit each IP to 100 per windowMs
});

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

const verifyTokenAfterLogin = (req, res, next) => {

  if (!token) {
    return res.status(200).send("Uzytkownik musi sie zalogować");
  }

  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error(err);
      console.log('JsonWebTokenError: invalid signature.')
      return res.status(401).send('Sesja wygasła.');
    }

    req.user = decoded;
    next();
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) { //jesli nie ma nagłówka
    return res.status(401).send("Uzytkownik musi sie zalogować");
  }

  const token = authHeader.split(" ")[1]; // Odczytanie samego tokenu, pomijając "Bearer "
  
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error(err);
      console.log('JsonWebTokenError: invalid signature.');
      return res.status(401).send('Sesja wygasła.');
    }
    const userRole = decoded.role;
    req.userRole = userRole;
    req.user = decoded;
    next();
  });
};

const validateEmail = (e) => {
  const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return email.test(e);
};

module.exports = {
    limiter,
    publicKey,
    privateKey,
    queryParameterize,
    generateRandomNumber,
    uniqueArray,
    validateEmail,
    verifyTokenAfterLogin,
    verifyToken,
};
