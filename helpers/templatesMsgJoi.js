module.exports = credential => {
  return {
    'string.empty': `${credential} cannot be an empty`,
    'any.required': `missing required field ${credential}`,
    'string.pattern.base': `invalid ${credential}, please provide a valid ${credential}`,
  };
};
