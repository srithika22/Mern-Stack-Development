const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const BOOKS_FILE = path.join(__dirname, 'books.json');

app.use(express.json());
const readBooksFromFile = () => {
  try {
    if (!fs.existsSync(BOOKS_FILE)) {
      fs.writeFileSync(BOOKS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(BOOKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading books file:', error);
    return [];
  }
};

const writeBooksToFile = (books) => {
  try {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
  } catch (error) {
    console.error('Error writing books file:', error);
    throw new Error('Failed to save books');
  }
};

const getNextId = (books) => {
  if (books.length === 0) return 1;
  return Math.max(...books.map(book => book.id)) + 1;
};

app.get('/books', (req, res) => {
  try {
    const books = readBooksFromFile();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});


app.get('/books/available', (req, res) => {
  try {
    const books = readBooksFromFile();
    const availableBooks = books.filter(book => book.available === true);
    res.json(availableBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve available books' });
  }
});

app.post('/books', (req, res) => {
  try {
    const { title, author, available } = req.body;
    if (!title || !author) {
      return res.status(400).json({ 
        error: 'Title and author are required fields' 
      });
    }
    if (available !== undefined && typeof available !== 'boolean') {
      return res.status(400).json({ 
        error: 'Available field must be a boolean value' 
      });
    }
    
    const books = readBooksFromFile();
    const newBook = {
      id: getNextId(books),
      title,
      author,
      available: available !== undefined ? available : true
    };
    
    books.push(newBook);
    writeBooksToFile(books);
    
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

app.put('/books/:id', (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const { title, author, available } = req.body;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    const books = readBooksFromFile();
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    if (available !== undefined && typeof available !== 'boolean') {
      return res.status(400).json({ 
        error: 'Available field must be a boolean value' 
      });
    }
    if (title !== undefined) books[bookIndex].title = title;
    if (author !== undefined) books[bookIndex].author = author;
    if (available !== undefined) books[bookIndex].available = available;
    
    writeBooksToFile(books);
    res.json(books[bookIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/books/:id', (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    const books = readBooksFromFile();
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    writeBooksToFile(books);
    
    res.json({ 
      message: 'Book deleted successfully', 
      deletedBook 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log('');
  console.log('    BOOKS API SERVER STARTED');
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log('Available Endpoints:');
  console.log('  GET    /books           - Get all books');
  console.log('  GET    /books/available - Get available books only');
  console.log('  POST   /books           - Add a new book');
  console.log('  PUT    /books/:id       - Update a book by ID');
  console.log('  DELETE /books/:id       - Delete a book by ID');
  console.log('');
});

module.exports = app;