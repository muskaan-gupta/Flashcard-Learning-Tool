const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// Routes
// Get All Flashcards
app.get('/flashcards', (req, res) => {
  const sql = 'SELECT * FROM flashcards';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Get Single Flashcard by ID
app.get('/flashcards/:id', (req, res) => {
  const sql = 'SELECT * FROM flashcards WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});


app.post('/flashcards', (req, res) => {
  const sql = 'INSERT INTO flashcards SET ?';
  const flashcard = req.body;
  db.query(sql, flashcard, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.put('/flashcards/:id', (req, res) => {
  const sql = 'UPDATE flashcards SET ? WHERE id = ?';
  const flashcard = req.body;
  db.query(sql, [flashcard, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.delete('/flashcards/:id', (req, res) => {
  const sql = 'DELETE FROM flashcards WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
