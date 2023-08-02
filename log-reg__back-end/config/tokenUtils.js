const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const TOKEN_EXPIRATION_TIME = '1m';
const SECRET_REFRESH_TOKEN = 'secretRefreshTokenKey';
const REFRESH_TOKEN_EXPIRATION = '7d';

const { privateKey } = crypto.generateKeyPairSync('rsa', {
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

const generateToken = (username, role) => {
  const payload = {
    user: username,
    role: role,
    exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRATION_TIME.split('m')[0]) * 60 * 60
  };
  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
}

const generateRefreshToken = (username) => {
  const payload = {
    user: username,
  };
  return jwt.sign(payload, SECRET_REFRESH_TOKEN, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
}

module.exports = {
  generateToken,
  generateRefreshToken,
  TOKEN_EXPIRATION_TIME, 
  SECRET_REFRESH_TOKEN, 
  REFRESH_TOKEN_EXPIRATION
};
