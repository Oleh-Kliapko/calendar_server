const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { title } = req.body;
  const categoryTitle = await Category.findOne({ title });

  if (categoryTitle) {
    throw HttpError(
      409,
      'This category has already been in database. Please choose another',
    );
  }

  const result = await Category.create({ ...req.body });
  return res.status(201).json(result);
};
