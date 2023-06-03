const express = require('express');

const ctrl = require('../../controllers/reviews');
const { authenticate, validateBody } = require('../../middlewares');
const {
  review: { validationReview },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getAllReviews);
router.get('/own', authenticate, ctrl.getOwnReviews);
router.post('/', authenticate, validateBody(validationReview), ctrl.addReview);

module.exports = router;
