const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (!user) throw HttpError(401, 'Please reload the page');

  const { username, email, balance } = user;

  res.status(200).json({
    user: {
      username,
      email,
      balance,
      token,
    },
    message: `User by email: ${email} has been authorized`,
  });
};
