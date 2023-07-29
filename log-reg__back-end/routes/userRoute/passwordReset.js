const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { UsersRecord } = require("../../database/Records/UsersRecord");

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    res.status(200).send('The server is working properly.');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while trying to establish a GET connection.');
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = {
      emailExists: await UsersRecord.selectByEmail([email]),
    };

    
    if (!userExists.emailExists || userExists.emailExists.length === 0) {
        return res.status(401).send('User with this email address does not exist.');
    }else{
      const hashPassword = await bcrypt.hash(password, 10);
      await UsersRecord.updatePasswordByEmail([hashPassword, email]);
      
      res.status(200).send('Successful password reset.');
    } 
  } catch (error) {
        console.error(error);
    res.status(500).send('Unknown server error. Please contact your administrator.');
  }
});

module.exports = router;
