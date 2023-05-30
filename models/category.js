const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { patterns, templatesMsgJoi } = require('../helpers');

const validationCategory = Joi.object({
  title: Joi.string()
    .pattern(patterns.namePattern)
    .required()
    .messages(templatesMsgJoi('title')),
});

const categorySchema = new Schema(
  {
    title: {
      type: String,
      match: patterns.namePattern,
      required: [true, 'Category is required. Please provide user name'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Category = model('category', categorySchema);

module.exports = {
  Category,
  validationCategory,
};
