const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  destroyFriend
} = require('../../controllers/userController.js');

// /api/courses
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/courses/:courseId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(destroyFriend)

module.exports = router;
