const {
  review: { Review },
} = require('../models');

module.exports = async (id, username, avatarURL) => {
  try {
    const reviews = await Review.find({ owner: id });

    for (const item of reviews) {
      const { _id, stars, comment, owner } = item;

      await Review.findByIdAndUpdate(_id.toString(), {
        stars,
        comment,
        owner,
        username,
        avatarURL,
      });
    }
  } catch (error) {
    return error;
  }
};
