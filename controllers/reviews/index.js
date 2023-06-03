const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getAllReviews: ctrlWrapper(require('./getAllReviews')),
  getOwnReviews: ctrlWrapper(require('./getOwnReviews')),
  addReview: ctrlWrapper(require('./addReview')),
  updateReview: ctrlWrapper(require('./updateReview')),
  deleteReview: ctrlWrapper(require('./deleteReview')),
};
