const router = require('express').Router();

const ctrl = require('../../controllers/tasks');
const { validateBody, authenticate } = require('../../middlewares');
const {
  task: { validationAddTask },
} = require('../../models');

router.post('/', authenticate, validateBody(validationAddTask), ctrl.addTask);

module.exports = router;
