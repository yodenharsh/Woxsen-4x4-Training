const express = require('express');
const session = require('express-session');
const { auth } = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Root route handler
app.get('/', (req, res) => {
  if (req.session.userId || req.session.isAdmin) {
    res.redirect('/books');
  } else {
    res.redirect('/auth/login');
  }
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/rentals', require('./routes/rentalRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});