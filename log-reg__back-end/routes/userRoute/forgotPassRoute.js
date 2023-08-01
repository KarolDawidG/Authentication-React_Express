const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const middleware = require("../../config/middleware");
const { UsersRecord } = require("../../database/Records/UsersRecord");
const router = express.Router();
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const {service, user, pass, jwt_secret} = require('../../config/configENV');

router.use(middleware);

router.get('/', (req, res) => {
  return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
});

router.post('/', async (req, res) => {
    const { email } = req.body;

    let usernameReset = '';
    let idReset = '';
    let emailReset = '';
    let passwordReset = '';
    
    try {
        const [emailExists] = await UsersRecord.selectByEmail([email]);
        
        usernameReset = emailExists?.username;
        emailReset = emailExists?.email;
        idReset = emailExists?.id;
        passwordReset = emailExists?.password;

          if (!emailExists || emailExists.length === 0) {
            return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.EMAIL_DOES_EXIST);
          }
      
      } catch (error) {
        console.log(error);
        res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
      }
      
      const secret = jwt_secret + passwordReset;
      const payload = {
          email: emailReset,
          id: idReset
      };
      const token = jwt.sign(payload, secret, { expiresIn: '15m' });
      const link = `http://localhost:3000/reset/${idReset}/${token}`;

      console.log(`Link do resetowania: ======> ${link}`);
      
    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mailOptions = {
        from: user,
        to: email,
        subject: `Password Reset - Message from  ${user}`,
        text: `
          Hello ${usernameReset},
      
          We have received a request to reset your password. Please click on the link below to reset your password:
      
          ${link}
      
          If you did not request a password reset, please ignore this email. Your account is secure.
      
          Best regards,
          The Team at [Your Company Name]
        `,
      };
      

      try {
        await transporter.sendMail(mailOptions);
          logger.info(MESSAGES.EMAIL_SUCCESS);
          res.status(STATUS_CODES.SUCCESS).send(MESSAGES.EMAIL_SUCCESS);
      } catch (error) {
          logger.error(error.message);
          res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
      }
  });



module.exports = router;
