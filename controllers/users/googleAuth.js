const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  users: { User },
} = require('../../models');
const { SECRET_KEY, EXPIRES_TOKEN } = process.env;

module.exports = {
  auth: passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),

  callback: passport.authenticate('google', {
    failureRedirect: '/api/users/login',
  }),

  successCallback: async (req, res) => {
    const { _id: id, username, email, balance } = req.user;
    const payload = {
      id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_TOKEN });
    await User.findByIdAndUpdate(id, { token });

    const redirectURL = `https://my-app.com/wallet_front?token=${token}`; // MUST BE CHANGED!!!

    return res.status(200).json({
      data: {
        username,
        email,
        balance,
        token,
      },
      message: `User with email: ${email} has been logged in through Google Auth`,
      redirectURL,
    });
  },
};
