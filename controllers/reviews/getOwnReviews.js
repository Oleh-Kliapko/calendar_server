const {
  review: { Review },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ owner }, '-updatedAt', {
    skip,
    limit,
  });

  res.status(200).json({
    data: {
      reviews,
    },
  });
};
