const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require('./verifyToken');
const {
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers,
  getUserByName,
} = require('../controllers/user');
const UserModel = require('../models/user');

const router = require('express').Router();

router.route('/').get(verifyToken, getUserByName);

router
  .route('/:id')
  .put(verifyTokenAndAuthorization, updateUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById)
  .get(verifyTokenAndAuthorization, getUserById);

router.route('/').get(verifyTokenAndAdmin, getAllUsers);

//GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
          },
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
