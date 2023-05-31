const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { patterns, templatesMsgJoi } = require('../helpers');

const validationReview = Joi.object({
  avatarURL: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .pattern(patterns.urlPattern)
    .required()
    .messages(templatesMsgJoi('avatarURL')),
  stars: Joi.number()
    .valid(1, 2, 3, 4, 5)
    .required()
    .messages(templatesMsgJoi('stars')),
  reviewer: Joi.string()
    .pattern(patterns.namePattern)
    .max(32)
    .required()
    .messages(templatesMsgJoi('reviewer')),
  comment: Joi.string()
    .min(6)
    .max(300)
    .required()
    .messages(templatesMsgJoi('comment')),
});

const reviewSchema = new Schema(
  {
    avatarURL: {
      type: String,
      match: patterns.urlPattern,
      required: [true, 'Avatar URL is required'],
    },
    stars: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    reviewer: {
      type: String,
      maxlength: 32,
      match: patterns.namePattern,
      required: [true, 'Reviewer is required'],
    },
    comment: {
      type: String,
      minlength: 6,
      maxlength: 300,
      required: [true, 'Comment is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Review = model('review', reviewSchema);

module.exports = {
  Review,
  validationReview,
};
