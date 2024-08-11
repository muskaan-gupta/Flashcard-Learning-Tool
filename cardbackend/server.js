const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5173; 

app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'flashcards_db' 
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


app.get('/flashcards', (req, res) => {
  connection.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.post('/flashcards', (req, res) => {
  const { front, back, frontImage, backImage } = req.body;
  const query = 'INSERT INTO flashcards (front, back, frontImage, backImage) VALUES (?, ?, ?, ?)';
  connection.query(query, [front, back, frontImage, backImage], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});


app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { front, back, frontImage, backImage } = req.body;
  const query = 'UPDATE flashcards SET front = ?, back = ?, frontImage = ?, backImage = ? WHERE id = ?';
  connection.query(query, [front, back, frontImage, backImage, id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});


app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
