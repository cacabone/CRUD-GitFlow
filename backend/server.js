const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'RobertGabrielX12.',
  database: 'crud'
});

// attempt to connect and log any connection errors
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message || err);
  } else {
    console.log('Connected to MySQL database `crud`.');
  }
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    return res.json(results);
  });
});

// Also expose API under /api/users to avoid conflicts with static files/index.html
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    return res.json(results);
  });
});

// root route for sanity checks
app.get('/', (req, res) => {
  res.json({ message: 'API is running', route: '/users' });
});

// Serve React build if it exists (for production / single-server setup)
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
if (require('fs').existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Important: place API routes before this catch-all; already done above.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.post('/create', (req, res) => {
  // Accept password from client; if not provided, fall back to empty string
  const { name, email, password = '' } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    // return created resource info
    return res.status(201).json({ id: result.insertId, name, email });
  });
});

// Also accept POST to /users and /api/users (align with common frontend Axios usage)
app.post('/users', (req, res) => {
  const { name, email, password = '' } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    return res.status(201).json({ id: result.insertId, name, email });
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, password = '' } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    return res.status(201).json({ id: result.insertId, name, email });
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});