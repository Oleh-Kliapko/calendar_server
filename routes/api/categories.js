const express = require('express');

const ctrl = require('../../controllers/categories');
const { authenticate, validateBody } = require('../../middlewares');
const {
  category: { validationCategory },
} = require('../../models');

const router = express.Router();

router.get('/', authenticate, ctrl.getAllCategories);
router.post(
  '/',
  authenticate,
  validateBody(validationCategory),
  ctrl.addContact,
);

module.exports = router;
