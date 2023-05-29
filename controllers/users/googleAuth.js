const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  users: { User },
} = require('../../models');
const { SECRET_KEY, EXPIRES_TOKEN } = process.env;

const googleAuth = {
  auth: passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),

  callback: passport.authenticate('google', {
    failureRedirect: '/api/users/login',
  }),

  successCallback: async (req, res) => {
    const { _id: id } = req.user;
    const payload = {
      id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_TOKEN });
    await User.findByIdAndUpdate(id, { token });

    const redirectURL = `https://Oleh-Kliapko.github.io/wallet_front?token=${token}`; // MUST BE CHANGED!!!
    res.redirect(redirectURL);
  },
};

module.exports = googleAuth;
