const express = require('express');
const {UsersRecord} = require("../../database/Records/UsersRecord");
const bcrypt = require("bcrypt");
const middleware = require("../../config/middleware");
const router = express.Router();
const { queryParameterize, validateEmail } = require('../../config/config');
const logger = require('../../logs/logger');
router.use(middleware);

router.get('/', async (req, res)=>{
    try{
        return res.status(200).send('Operation completed successfully.');
    } catch (error) {
        console.error(error);
        logger.error(error.message);
        return res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send('Invalid email address.');
    }

    if (username.match(queryParameterize)) {
      try {
        const userExists = {
          emailExists: await UsersRecord.selectByEmail([email]),
          loginExists: await UsersRecord.selectByUsername([username]),
        };
  
        if (
          (userExists.emailExists && userExists.emailExists.length > 0) &&
          (userExists.loginExists && userExists.loginExists.length > 0)
        ) {
            return res.status(401).send('Email and username already exist.');

        } else if (userExists.emailExists && userExists.emailExists.length > 0) {
            return res.status(401).send('Email already exists.');
        
        } else if (userExists.loginExists && userExists.loginExists.length > 0) {
            return res.status(401).send('Username already exists.');
    
        } else {
          const hashPassword = await bcrypt.hash(password, 10);
          await UsersRecord.insert([username, hashPassword, email]);
            return res.status(200).send('Successful registration.');
        }
      } catch (error) {
        console.error(error);
        logger.error(error.message);
        return res.status(500).send('Unknown server error. Please contact your administrator.');
      }
    } else {
        return res.status(400).send('You can\'t just do a SQL Injection attack and think everything is fine');
    }
  });

module.exports = router;

