const router = require('express').Router();

// const ctrl = require('../../controllers/transactions');
const { validateBody, authenticate } = require('../../middlewares');
const { transaction } = require('../../models');

// router.post('/login', validateBody(validationLoginUser), ctrl.login);

module.exports = router;
