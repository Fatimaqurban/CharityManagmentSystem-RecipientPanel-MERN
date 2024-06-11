const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role:{
    type :String,
    default:'admin'
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  religion: {
    type: String
  },
  profilePicture: {
    type: String  
  },
  isBlocked: {
     type: Boolean, 
     default: false 
  },
  
  donationHistory: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
      },
    },
  ],
  
  requests: [
    {
      id : String,
      recipientName: String,
      requestStatus: {
        type: String,
        enum: ['pendingRequest', 'confirmRequest'],
        default: 'pendingRequest',
      },
    },
  ],
 
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
