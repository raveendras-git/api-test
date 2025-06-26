const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST a new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1; // Auto-increment ID
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (Update) a book by ID
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex !== -1) {
    const updatedBook = { ...books[bookIndex], ...req.body, id };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send(); // No Content
  } else {
    res.status(404).send("Book not found");
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Book API!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
