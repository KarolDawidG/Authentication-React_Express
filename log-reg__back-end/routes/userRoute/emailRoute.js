const express = require('express');
const nodemailer = require('nodemailer');
const middleware = require("../../config/middleware");
const { UsersRecord } = require("../../database/Records/UsersRecord");
const router = express.Router();
const PASS ='sbxuilwsxwdrhdjl';
const USER ='karoldawidg@gmail.com';
const service ='gmail';

router.use(middleware);

router.get('/', async (req, res) => {
  try {
    return res.status(200).send('=========== sukces');
  } catch (error) {
    logger.error(error.message);
    return res.status(400).send('=========== fail');
  }
});

router.post('/', async (req, res) => {
    const { email, link } = req.body;
    let usernameReset = '';

    try {
        const [emailExists] = await UsersRecord.selectByEmail([email]);
        usernameReset = emailExists?.username;

        if (!emailExists || emailExists.length === 0) {
          return res.status(401).send('============brak email w bazie');
        }
    
      } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while sending the email');
      }
      

    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    const mailOptions = {
        from: USER,
        to: email,
        subject: `Password Reset - Message from  ${USER}`,
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
          console.log(`Restart link has been sended`);
          res.status(200).send('success');
      } catch (error) {
          console.log(error);
          res.status(500).send('An error occurred while sending the email');
      }
  });



module.exports = router;
