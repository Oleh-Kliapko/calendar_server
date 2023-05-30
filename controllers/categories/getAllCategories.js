const {
  category: { Category },
} = require('../../models');

module.exports = async (_, res) => {
  const categories = await Category.find({});
  const result = categories.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    switch (true) {
      case titleA === 'others':
        return 1;
      case titleB === 'others':
        return -1;
      case titleA < titleB:
        return -1;
      case titleA > titleB:
        return 1;
      default:
        return 0;
    }
  });

  res.status(200).json({
    data: {
      result,
    },
  });
};
