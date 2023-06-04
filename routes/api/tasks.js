const router = require('express').Router();

const ctrl = require('../../controllers/tasks');
const { validateBody, authenticate, isValidId } = require('../../middlewares');
const {
  task: { validationAddTask, validationUpdateTask },
} = require('../../models');

router.get('/', authenticate, ctrl.getTasks);

router.post('/', authenticate, validateBody(validationAddTask), ctrl.addTask);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  validateBody(validationUpdateTask),
  ctrl.updateTask,
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteTask);

module.exports = router;
