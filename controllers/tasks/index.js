const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addTask: ctrlWrapper(require('./addTask')),
  getTasks: ctrlWrapper(require('./getTasks')),
  updateTask: ctrlWrapper(require('./updateTask')),
  deleteTask: ctrlWrapper(require('./deleteTask')),
};
