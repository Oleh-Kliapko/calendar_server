const express = require('express');

const ctrl = require('../../controllers/reviews');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  review: { validationReview, validationUpdateReview },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getAllReviews);

router.post('/', authenticate, validateBody(validationReview), ctrl.addReview);

router.get('/own', authenticate, ctrl.getOwnReviews);

router.patch(
  '/own/:id',
  authenticate,
  isValidId,
  validateBody(validationUpdateReview),
  ctrl.updateReview,
);

router.delete('/own/:id', authenticate, isValidId, ctrl.deleteReview);

module.exports = router;
