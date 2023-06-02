const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const {
  user: { User },
} = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');
// const { SECRET_KEY, EXPIRES_TOKEN } = process.env;

module.exports = async (req, res) => {
  const { email, password, username } = req.body;
  const pureEmail = email.trim();
  const purePassword = password.trim();
  const pureUsername = username.trim();

  const user = await User.findOne({ email: pureEmail });
  if (user) {
    throw HttpError(
      409,
      `Email: ${email} has already registered. Please log in`,
    );
  }

  const hashPassword = await bcrypt.hash(purePassword, 10);
  const verificationToken = nanoid();

  // const payload = { id: nanoid(24) };
  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_TOKEN });

  const newUser = await User.create({
    ...req.body,
    email: pureEmail,
    username: pureUsername,
    password: hashPassword,
    // token,
    verificationToken,
  });

  await sendEmail(pureEmail, verificationToken);

  return res.status(201).json({
    data: {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      // token,
    },
    message: `User with email: ${newUser.email} has been created`,
  });
};
