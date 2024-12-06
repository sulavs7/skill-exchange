const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/',(req,res)=>{
  res.render("homepage.ejs");
});

//routing on authentication
app.use('/', authRoutes);

//routing on pages from the navbar 
app.use('/', pageRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
