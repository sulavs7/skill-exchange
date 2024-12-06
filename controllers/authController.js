const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signupPage = (req, res) => {
  // This is for displaying the signup page (it can be handled with separate routes for tourist and local)
  if (req.path === '/signup') {
    res.render('signup-tourist.ejs'); // Render the tourist signup page
  } else if (req.path === '/signup-local') {
    res.render('signup-local.ejs'); // Render the local signup page
  } else {
    res.status(400).send('Invalid signup page.');
  }
};

const handleSignup = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).send('All fields are required.');
  }

  if (password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters long.');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('This email is already registered.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add role during signup
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    //redirect based on role 
    if (role === 'tourist') {
      // res.render('tourist-pov.ejs');
      res.redirect('/login');

    } else if (role === 'local') {
      // res.render('local-pov.ejs');
      res.redirect('/local-pov');
    } else {
      res.status(400).send('Invalid role.');
    }


  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('An error occurred during signup.');
  }
};

const loginPage = (req, res) => {
  res.render('login.ejs'); // Renders the login page
};
const handleLogin = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    const { role } = user; // Extract the role
    console.log(`User logged in with role: ${role}`); // Debug log

    if (role === 'tourist') {
      // res.render('tourist-pov.ejs');
      res.redirect('/tourist-pov');

    } else if (role === 'local') {
      // res.render('local-pov.ejs');
      res.redirect('/local-pov');
    } else {
      res.status(400).send('Invalid role.');
    }
  } catch (error) {
    console.error('Error during login:', error); // Detailed error logging
    res.status(500).send('An error occurred during login.');
  }
};

module.exports = {
  signupPage,
  handleSignup,
  loginPage,
  handleLogin,
};
