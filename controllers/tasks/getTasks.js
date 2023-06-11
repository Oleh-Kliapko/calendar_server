const {
  task: { Task },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id: owner } = req.user;
  const { month = new Date().getMonth() + 1 } = req.query;

  const result = await Task.find({ owner }, '-updatedAt');

  const boards = [
    { category: 'to-do', owner: '', tasks: [] },
    { category: 'in-progress', owner: '', tasks: [] },
    { category: 'done', owner: '', tasks: [] },
  ];

  result.forEach(task => {
    const boardIndex = boards.findIndex(
      board => board.category === task.category,
    );
    if (boardIndex !== -1) {
      const taskWithOwner = {
        _id: task._id,
        title: task.title,
        start: task.start,
        end: task.end,
        priority: task.priority,
        date: task.date,
      };
      boards[boardIndex].tasks.push(taskWithOwner);
      if (!boards[boardIndex].owner) {
        boards[boardIndex].owner = task.owner;
      }
    }
  });

  const tasksCurrentMonth = result.filter(
    item => item.date.getMonth() + 1 === Number(month),
  );

  res.status(200).json({
    data: {
      tasksCurrentMonth,
      allTasks: result,
      boards,
    },
  });
};
