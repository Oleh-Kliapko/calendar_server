const {
  task: { Task },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id: owner } = req.user;
  const { month = new Date().getMonth() + 1 } = req.query;

  const result = await Task.find({ owner }, '-updatedAt');

  const tasksCurrentMonth = result.filter(
    item => item.date.getMonth() + 1 === Number(month),
  );

  res.status(200).json({
    data: {
      tasksCurrentMonth,
      allTasks: result,
    },
  });
};
