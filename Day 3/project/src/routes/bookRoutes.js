const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const books = await Book.getAll();
  res.render('books', { 
    books, 
    isAdmin: req.session.isAdmin,
    userId: req.session.userId 
  });
});

router.post('/', adminAuth, async (req, res) => {
  const { name, yearOfPublication, isbn, volumeInStock } = req.body;
  await Book.create(name, yearOfPublication, isbn, volumeInStock);
  res.redirect('/books');
});

router.post('/delete/:id', adminAuth, async (req, res) => {
  await Book.delete(req.params.id);
  res.redirect('/books');
});

module.exports = router;