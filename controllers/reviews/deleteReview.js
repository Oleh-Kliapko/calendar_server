const {
  review: { Review },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    throw HttpError(404, 'Review not found');
  }

  return res.status(200).json({ message: `Review by ID:${id} was deleted` });
};
