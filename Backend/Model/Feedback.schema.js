const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userRole: {
    type: String, 
    required: true,
  },
  userName:{
    type: String
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;