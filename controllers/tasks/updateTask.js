const {
  task: { Task },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!task) {
    throw HttpError(404, 'Not found');
  }

  const { title, start, end, priority, date, category, owner, createdAt } =
    task;

  return res.status(200).json({
    data: {
      title,
      start,
      end,
      priority,
      date,
      category,
      owner,
      createdAt,
    },
    message: `Task ID "${id}" of User with ID "${owner}" has been updated`,
  });
};
