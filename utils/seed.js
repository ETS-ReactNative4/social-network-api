const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData');
const thoughtData = require('./thoughtData');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Add data to collection
  await User.collection.insertMany(userData);
  await Thought.collection.insertMany(thoughtData);

  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.table(thoughtData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
