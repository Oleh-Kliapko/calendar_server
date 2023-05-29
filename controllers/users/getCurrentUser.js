module.exports = async (req, res) => {
  const { _id, username, balance } = req.user;
  res.status(200).json({
    data: {
      id: _id,
      username,
      balance,
    },
  });
};
