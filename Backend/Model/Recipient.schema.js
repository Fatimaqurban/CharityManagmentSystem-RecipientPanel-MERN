const mongoose = require('mongoose');

// Define Recipient Schema
const recipientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role:{
    type :String,
    default:'recipient'
  },
  isNeedFullfiled: {
    type: Boolean,
    default:false
  },
  feedback: [
    {
      donorEmail: {
        type: String,
       required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  occupation: {
    type: String
  },
  income: {
    type: Number
  },
  needs: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
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
  document: 
    {
      type: String  
    }
  
});

// Create Recipient model
const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;
