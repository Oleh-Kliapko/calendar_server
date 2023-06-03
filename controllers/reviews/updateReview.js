const {
  review: { Review },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const { id } = req.params;
  const review = await Review.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!review) {
    throw HttpError(404, 'Not found');
  }

  const { stars, comment, owner, createdAt } = review;

  return res.status(200).json({
    data: {
      stars,
      comment,
      owner,
      createdAt,
    },
  });
};
