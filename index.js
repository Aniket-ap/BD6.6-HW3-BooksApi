const express = require('express');
const app = express();
const { getAllBooks, getBookById } = require('./books');
app.use(express.json());

app.get('/books', (req, res) => {
  const books = getAllBooks();
  if (books.length > 0) {
    res.status(200).json({ books });
  } else {
    res.status(404).json({ error: 'No books found' });
  }
});

app.get('/books/details/:id', (req, res) => {
  const book = getBookById(parseInt(req.params.id, 10));
  if (book) {
    res.status(200).json({ book });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

module.exports = { app };
