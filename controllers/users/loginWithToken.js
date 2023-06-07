const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (!user) throw HttpError(401, 'Please reload the page');

  const { avatarUrl, username, email, birthday, phone, skype } = user;

  res.status(200).json({
    data: {
      avatarUrl,
      username,
      email,
      birthday,
      phone,
      skype,
      token,
    },
    message: `User by email: ${email} has been authorized`,
  });
};
