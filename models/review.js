const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { templatesMsgJoi, handleMongooseError } = require('../helpers');

const validationReview = Joi.object({
  stars: Joi.number()
    .valid(1, 2, 3, 4, 5)
    .required()
    .messages(templatesMsgJoi('stars')),
  comment: Joi.string()
    .min(6)
    .max(300)
    .required()
    .messages(templatesMsgJoi('comment')),
});

const validationUpdateReview = Joi.object({
  stars: Joi.number().valid(1, 2, 3, 4, 5).messages(templatesMsgJoi('stars')),
  comment: Joi.string().min(6).max(300).messages(templatesMsgJoi('comment')),
});

const reviewSchema = new Schema(
  {
    stars: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    comment: {
      type: String,
      minlength: 6,
      maxlength: 300,
      required: [true, 'Comment is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

reviewSchema.post('save', handleMongooseError);
const Review = model('review', reviewSchema);

module.exports = {
  Review,
  validationReview,
  validationUpdateReview,
};
