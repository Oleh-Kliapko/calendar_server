const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addTask: ctrlWrapper(require('./addTask')),
};
