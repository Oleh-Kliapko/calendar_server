const {
  review: { Review },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id, username, avatarURL } = req.user;

  const review = await Review.create({
    ...req.body,
    owner: _id,
    username,
    avatarURL,
  });
  const { stars, comment, owner, createdAt } = review;
  return res.status(201).json({
    data: {
      stars,
      comment,
      owner,
      username,
      avatarURL,
      createdAt,
    },
    message: `Review by User: ${owner} has been created`,
  });
};
