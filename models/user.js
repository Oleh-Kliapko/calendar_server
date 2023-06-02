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

// validation to change user
const validationCurrentUser = Joi.object({
  avatarURL: Joi.string()
    .pattern(patterns.urlPattern)
    .required()
    .messages(templatesMsgJoi('avatarURL')),
  username: Joi.string()
    .pattern(patterns.namePattern)
    .required()
    .messages(templatesMsgJoi('username')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('email')),
  birthday: Joi.date().required().messages(templatesMsgJoi('birthday')),
  phone: Joi.string()
    .pattern(patterns.phonePattern)
    .required()
    .messages(templatesMsgJoi('phone')),
  skype: Joi.string().required().messages(templatesMsgJoi('skype')),
});

// ====================================================
const userSchema = new Schema(
  {
    avatarURL: {
      type: String,
      match: patterns.urlPattern,
      default: '',
    },
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
    birthday: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: 'Birthday should not be in the past',
      },
      default: function () {
        return null;
      },
    },
    phone: {
      type: String,
      match: patterns.phonePattern,
      default: '',
    },
    skype: {
      type: String,
      default: '',
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
  validationCurrentUser,
};
