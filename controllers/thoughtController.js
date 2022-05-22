// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all thought
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the users list
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'Thought deleted, but no associated user found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a student
  // addAssignment(req, res) {
  //   console.log('You are adding an assignment');
  //   console.log(req.body);
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // Remove assignment from a student
  // removeAssignment(req, res) {
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
