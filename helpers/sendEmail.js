const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { BASE_URL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async (email, verificationToken) => {
  const newEmail = {
    to: email,
    subject: 'Verify your email, please',
    html: `<h3>If you want to sign in wallet, </h3><a style="font-size:16px" target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">click this to verify your email</a>`,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
