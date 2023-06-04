const { Schema, model } = require('mongoose');
const Joi = require('joi');

const priorityEnum = ['low', 'medium', 'high'];
const categoryEnum = ['to-do', 'in-progress', 'done'];

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

const validationAddTask = Joi.object({
  title: Joi.string().max(250).required().messages(templatesMsgJoi('title')),
  start: Joi.string()
    .pattern(patterns.timePattern)
    .required()
    .messages(templatesMsgJoi('start')),
  end: Joi.string()
    .pattern(patterns.timePattern)
    .required()
    .messages(templatesMsgJoi('end')),
  priority: Joi.string()
    .valid(...priorityEnum)
    .required()
    .messages(templatesMsgJoi('priority')),
  date: Joi.string()
    .pattern(patterns.datePattern)
    .required()
    .messages(templatesMsgJoi('date')),
  category: Joi.string()
    .valid(...categoryEnum)
    .required()
    .messages(templatesMsgJoi('category')),
});

const validationUpdateTask = Joi.object({
  title: Joi.string().max(250).messages(templatesMsgJoi('title')),
  start: Joi.string()
    .pattern(patterns.timePattern)
    .messages(templatesMsgJoi('start')),
  end: Joi.string()
    .pattern(patterns.timePattern)
    .messages(templatesMsgJoi('end')),
  priority: Joi.string()
    .valid(...priorityEnum)
    .messages(templatesMsgJoi('priority')),
  date: Joi.string()
    .pattern(patterns.datePattern)
    .messages(templatesMsgJoi('date')),
  category: Joi.string()
    .valid(...categoryEnum)
    .messages(templatesMsgJoi('category')),
});

// ====================================================
const taskSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      required: [true, 'Title is required'],
    },
    start: {
      type: String,
      match: patterns.timePattern,
      required: [true, 'Start of task is required'],
    },
    end: {
      type: String,
      match: patterns.timePattern,
      required: [true, 'End of task is required'],
      validate: {
        validator: function (value) {
          const start = this.start;
          return value > start;
        },
        message: 'End time should be greater than start time',
      },
    },
    priority: {
      type: String,
      enum: priorityEnum,
      required: [true, 'Priority of task is required'],
    },
    date: {
      type: Date,
      match: [patterns.datePattern, 'Invalid date format, use YYYY-MM-DD'],
    },
    category: {
      type: String,
      enum: categoryEnum,
      required: [true, 'Category of task is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

module.exports = {
  Task,
  validationAddTask,
  validationUpdateTask,
};
