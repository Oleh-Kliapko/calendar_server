const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getAllReviews: ctrlWrapper(require('./getAllReviews')),
  addReview: ctrlWrapper(require('./addReview')),
};
