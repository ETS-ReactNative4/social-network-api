const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  destroyReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route(':thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(destroyReaction);

module.exports = router;
