const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getAllCategories: ctrlWrapper(require('./getAllCategories')),
  addContact: ctrlWrapper(require('./addCategory')),
};
