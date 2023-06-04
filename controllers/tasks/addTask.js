const {
  task: { Task },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;

  const task = await Task.create({ ...req.body, owner: _id });
  const { title, start, end, priority, date, category, owner, createdAt } =
    task;

  return res.status(201).json({
    data: {
      id: task._id,
      title,
      start,
      end,
      priority,
      date,
      category,
      owner,
      createdAt,
    },
    message: `Task ID "${task._id}" of User with ID "${owner}" has been created`,
  });
};
