const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [ this ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('user', userSchema);

module.exports = User;
