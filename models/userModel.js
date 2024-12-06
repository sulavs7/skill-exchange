

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['tourist', 'local'], // Defines the type of user
    required: true,
  },
  category: {
    type: String,
    // category is only required if the user is a local
    validate: {
      validator: function (value) {
        // Only validate if the role is 'local'
        return this.role === 'local' ? value != null : true;
      },
      message: 'Category is required for locals',
    },
  },
  // Add any other fields as needed
});

module.exports = mongoose.model('User', userSchema);

