const {
  task: { Task },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw HttpError(404, 'Task not found');
  }

  return res.status(200).json({ message: `Task by ID:${id} was deleted` });
};
