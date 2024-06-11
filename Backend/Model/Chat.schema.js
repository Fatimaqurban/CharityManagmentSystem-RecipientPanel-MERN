const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  donorId: { type: String, required: true },
  chatId: { type: String },

  messages: [
    {
      sender: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],  // Array of messages
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
