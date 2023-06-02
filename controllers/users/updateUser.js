const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!user) {
    throw HttpError(404, 'Not found');
  }

  const { avatarURL, username, email, birthday, phone, skype } = user;

  return res.status(200).json({
    data: {
      avatarURL,
      username,
      email,
      birthday,
      phone,
      skype,
    },
  });
};

module.exports = updateUser;
