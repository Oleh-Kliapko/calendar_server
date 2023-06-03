const {
  review: { Review },
} = require('../../models');

module.exports = async (_, res) => {
  const review = await Review.find({});

  res.status(200).json({
    data: {
      result: review,
    },
  });
};
