const {
  review: { Review },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const result = await Review.create({ ...req.body });
  return res.status(201).json(result);
};
