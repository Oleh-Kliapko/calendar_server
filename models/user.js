const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

// registration validation user
const validationRegistrationUser = Joi.object({
  username: Joi.string()
    .pattern(patterns.namePattern)
    .required()
    .messages(templatesMsgJoi('username')),
  password: Joi.string()
    .pattern(patterns.passwordPattern)
    .required()
    .messages(templatesMsgJoi('password')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('email')),
});

// login validation user
const validationLoginUser = Joi.object({
  password: Joi.string()
    .pattern(patterns.passwordPattern)
    .required()
    .messages(templatesMsgJoi('password')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('email')),
});

// validation email to resend email letter for verification
const validationEmailUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('email')),
});

// ====================================================
const userSchema = new Schema(
  {
    password: {
      type: String,
      match: patterns.passwordPattern,
      required: [true, 'The password is required. Set it for user'],
    },
    email: {
      type: String,
      unique: true,
      match: patterns.emailPattern,
      required: [
        true,
        'The email is required. Please provide an email address for user',
      ],
    },
    username: {
      type: String,
      match: patterns.namePattern,
      required: [true, 'Name is required. Please provide user name'],
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      default: 0,
    },
    token: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMongooseError);
const User = model('user', userSchema);

module.exports = {
  User,
  validationRegistrationUser,
  validationLoginUser,
  validationEmailUser,
};
