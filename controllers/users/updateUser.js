const {
  user: { User },
} = require('../../models');

const { HttpError } = require('../../helpers');

const update = async (req, res) => {
  const { id } = req.user;

  if (!req.body) throw new HttpError({ message: 'Missing field' });

  const user = await User.findByIdAndUpdate(id, {
    ...req.body,
    avatarUrl: req?.file?.path || '',
  });

  if (!user) throw new HttpError('User not found');

  const updatedUser = await User.findById(id);
  const { username, email, phone, avatarUrl, skype, birthday } = updatedUser;

  res.status(200).json({
    data: {
      username,
      email,
      phone,
      avatarUrl,
      skype,
      birthday,
    },
    message: `User with ID: ${id} was updated`,
  });
};

module.exports = update;
