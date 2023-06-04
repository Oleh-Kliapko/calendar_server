const {
  user: { User },
} = require('../../models');

const { HttpError } = require('../../helpers');

const update = async (req, res) => {
  const { id } = req.user;
  const bodyParam = req.body;

  let updateParam = { ...bodyParam };
  console.log(updateParam);

  if (req.file) {
    const { path: avatarURL } = req.file;
    updateParam = { avatarURL, ...bodyParam };
    console.log(updateParam);
  }

  if (!updateParam) throw new HttpError({ message: 'Missing field' });

  const user = await User.findByIdAndUpdate(id, updateParam);
  console.log(user);
  if (!user) throw new HttpError('User not found');

  const { username, email, phone, avatarURL, skype, birthday } = user;
  res.json({
    status: 'success',
    message: 'User updated',
    user: {
      username,
      email,
      phone,
      avatarURL,
      skype,
      birthday,
    },
  });
};

module.exports = update;
