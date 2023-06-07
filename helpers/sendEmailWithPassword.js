const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async (email, newPassword) => {
  const newEmail = {
    to: email,
    subject: 'Safe your password, please',
    html: `<h3>We sent you your new password - ${newPassword}</h3>`,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
