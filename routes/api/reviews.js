const express = require('express');

const ctrl = require('../../controllers/reviews');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  review: { validationReview },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getAllReviews);
router.post('/', authenticate, validateBody(validationReview), ctrl.addReview);

router.get('/own', authenticate, ctrl.getOwnReviews);
router.put(
  '/own/:id',
  authenticate,
  isValidId,
  validateBody(validationReview),
  ctrl.updateReview,
);

module.exports = router;
