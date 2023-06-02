const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  return res.status(200).json(result);
};

module.exports = updateUser;
