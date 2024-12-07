
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
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
  name: {
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
  price: {
    type: Number,
    validate: {
      validator: function (value) {
        return this.role === 'local' ? value != null : true;
      },
      message: 'Price is required for locals',
    },
  },
  description: {
    type: String,
    validate: {
      validator: function (value) {
        return this.role === 'local' ? value != null : true;
      },
      message: 'Description is required for locals',
    },
  },
  contact: {
    type: String,
    validate: {
      validator: function (value) {
        return this.role === 'local' ? value != null : true;
      },
      message: 'Contact information is required for locals',
    },
  },
  // Add any other fields as needed
});
// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it elsewhere in your app
module.exports = User;