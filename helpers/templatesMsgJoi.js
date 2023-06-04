module.exports = credential => {
  return {
    'string.empty': `${credential} cannot be an empty`,
    'any.required': `missing required field ${credential}`,
    'string.pattern.base': `invalid ${credential}, please provide a valid ${credential}`,
    'string.uri': `Invalid URL format for ${credential}`,
    'number.base': `Invalid type for ${credential}`,
    'any.only': `${credential} must equal one of certain values. Check conditions`,
  };
};
