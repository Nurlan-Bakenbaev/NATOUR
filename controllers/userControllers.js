const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
};

module.exports = { getAllUsers, getUser, deleteUser, updateUser, createUser };
