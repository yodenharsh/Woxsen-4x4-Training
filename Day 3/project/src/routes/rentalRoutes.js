const express = require('express');
const router = express.Router();
const Rental = require('../models/rentalModel');
const Book = require('../models/bookModel');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const rentals = req.session.isAdmin ? 
    await Rental.getAll() : 
    await Rental.getUserRentals(req.session.userId);
  res.render('rentals', { 
    rentals,
    isAdmin: req.session.isAdmin 
  });
});

router.post('/borrow/:bookId', auth, async (req, res) => {
  try {
    const book = await Book.updateStock(req.params.bookId, -1);
    if (book.volume_in_stock >= 0) {
      await Rental.create(req.session.userId, req.params.bookId);
      res.redirect('/rentals');
    } else {
      await Book.updateStock(req.params.bookId, 1); // Revert stock change
      res.redirect('/books?error=No copies available');
    }
  } catch (error) {
    res.redirect('/books?error=Borrow failed');
  }
});

router.post('/return/:id', auth, async (req, res) => {
  try {
    const rental = await Rental.return(req.params.id);
    await Book.updateStock(rental.book_id, 1);
    res.redirect('/rentals');
  } catch (error) {
    res.redirect('/rentals?error=Return failed');
  }
});

module.exports = router;