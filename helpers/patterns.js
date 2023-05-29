const namePattern = /^[\p{L}\s]+$/u; // only Latin or Cyrillic characters
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/; // 6 characters, at lest one upperCase and one lowercase

const patterns = { namePattern, emailPattern, passwordPattern };

module.exports = patterns;
