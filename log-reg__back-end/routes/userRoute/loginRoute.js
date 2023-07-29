const express = require('express');
const jwt = require('jsonwebtoken');
const { UsersRecord } = require("../../database/Records/UsersRecord");
const bcrypt = require("bcrypt");
const router = express.Router();
const middleware = require('../../config/middleware')
const {verifyTokenAfterLogin,  publicKey, privateKey, queryParameterize } = require('../../config/config');
const logger = require('../../logs/logger');
router.use(middleware);


router.get('/', verifyTokenAfterLogin, (req, res) => {
    if (token) {
        jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
            if (error) {
                logger.error(error.message);
                return res.status(401).send('Your session has expired. Please log in again.');
            } else {
                return res.status(200).send('Successful operation.');
            }
        });
    } else {
        return res.status(401).send('The user is not logged in.');
    }
});

router.post("/", async (req, res) => {
  try {
    const user = req.body.username;
    const password = req.body.password;
      if (!user || !password) {
        return res.status(400).send("Username and password are required");
      }

    const ifUser = await UsersRecord.selectByUsername([user]);
      if (user.match(queryParameterize)) {
        if (ifUser.length === 0) {
          return res.status(401).send("Wrong user name!");
        }

    const hashedPassword = ifUser[0].password;
    const result = await bcrypt.compare(password, hashedPassword);

      if (!result) {
        return res.status(401).send("Wrong password!");
      }
        const rola = ifUser[0].role;
        console.log(`Zalogowano użytkownika: ${user} poziom dostępu: ${rola}`);

      const generateToken = () => {
        const payload = {
          user: user,
          role: rola 
        };
        return jwt.sign(payload, privateKey, { algorithm: "RS256" });
      };
      
        const token = generateToken(user);  
        return res.status(200).json({ token: token });
    } else {
        return res.status(400).send("You can't just do a SQL Injection attack and think everything is fine");
    }
  } catch (error) {
      console.error(error);
      logger.error(error.message);
      return res.status(500).send("Unknown server error. Please contact your administrator.");
  }
});

module.exports = router;