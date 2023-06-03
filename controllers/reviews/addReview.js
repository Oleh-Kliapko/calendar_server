const {
  review: { Review },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;

  const review = await Review.create({ ...req.body, owner: _id });
  const { stars, comment, owner, createdAt } = review;
  return res.status(201).json({
    data: {
      stars,
      comment,
      owner,
      createdAt,
    },
    message: `Review by User: ${owner} has been created`,
  });
};
