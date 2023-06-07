const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const {
  user: { User },
} = require('../../models');
const { HttpError, sendEmailWithPassword } = require('../../helpers');

module.exports = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'User is not found. Please check email');
  }

  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const newUser = await User.findOneAndUpdate(
    { email },
    {
      ...req.body,
      password: hashPassword,
    },
  );
  await sendEmailWithPassword(email, newPassword);

  return res.status(201).json({
    data: {
      email,
    },
    message: `User with email: ${newUser.email} has been created new password`,
  });
};
