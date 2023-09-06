const nodemailer = require('nodemailer');
const { service, user, pass } = process.env;

const sendResetPasswordEmail = async (email, usernameReset, link) => {
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
    subject: `Password Reset`,
    text: `
      Hello ${usernameReset},

      We have received a request to reset your password. Please click on the link below to reset your password:

      ${link}

      If you did not request a password reset, please ignore this email. Your account is secure.

      Best regards,
      The Team at [Your Company Name]
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendRegisterEmail = async (email, username, link) => {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailRegisOptions = {
    from: user,
    to: email,
    subject: `Welcome!`,
    text: `
      Hello ${username},

      Welcome in our service!
      Please click on the link below to end your registration:

      ${link}

      If you did not sign up in our services, please ignore this email.

      Best regards,
      The Team at [Your Company Name]
    `,
  };

  await transporter.sendMail(mailRegisOptions);
};

module.exports = { sendResetPasswordEmail, sendRegisterEmail };
