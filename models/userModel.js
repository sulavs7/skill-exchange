// //tourist database initialize 

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['local', 'tourist'], // Enum to restrict roles to 'local' or 'tourist'
    required: true // Ensure that a role is provided when creating a user
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
