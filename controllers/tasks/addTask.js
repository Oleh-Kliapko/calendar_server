const {
  task: { Task },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id: owner } = req.user;
  return res.status(201).json();
};
