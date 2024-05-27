// Require necessary modules
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const port = process.env.PORT || 3005;

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$HRutika0106',
    database: 'test'
});

// Connect to MySQL database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1); // Terminate the application if unable to connect to the database
    }
    console.log('Connected to MySQL database');
});

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contus.html'));
});

// Handle form submissions for contact
app.post('/contact', (req, res) => {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
        return res.status(400).json({ error: 'Username, email, and message are required fields.' });
    }
    const insertQuery = 'INSERT INTO contus (username, email, message) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, email, message], (err, result) => {
        if (err) {
            console.error('Error saving contact information:', err);
            return res.status(500).json({ error: 'Error saving contact information.' });
        }
        console.log('Contact information saved successfully');
        res.status(200).json({ success: 'Contact information saved successfully.' });
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'log.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }
    const query = 'SELECT * FROM sign WHERE username = ? AND passwd = ?';
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Error during login.');
        }
        if (result.length > 0) {
            // If login is successful, redirect to detail.html
            res.redirect(302, '/detail');
        } else {
            // If login fails, redirect back to login page
            res.redirect('/login');
        }
    });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Signup.html'));
});

app.post('/signup', (req, res) => {
    const { username, EmpID, mobno, emailID, passwd, confpasswd } = req.body;
    if (!username || !EmpID || !mobno || !emailID || !passwd || !confpasswd) {
        return res.status(400).json({ error: 'All fields are required for signup.' });
    }
    const sql = 'INSERT INTO sign (username, EmpID, mobno, emailID, passwd, confpasswd) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [username, EmpID, mobno, emailID, passwd, confpasswd], (err, result) => {
        if (err) {
            console.error('Error inserting into MySQL database:', err);
            return res.status(500).json({ error: 'Error signing up' });
        }
        console.log('User signed up successfully');
        res.status(200).json({ success: 'User signed up successfully.' });

        // Serve detail.html file
        app.get('/detail', function (req, res) {
            res.sendFile(__dirname + '/public/detail.html');
            

        });
    });
});

// Serve detail.html file
app.get('/detail', function (req, res) {
    res.sendFile(__dirname + '/public/detail.html');
});
// Route to fetch and display data
app.get('/data', (req, res) => {
    connection.query('SELECT * FROM helment', (error, results) => {
      if (error) {
        console.error('Error fetching data from MySQL database:', error);
        res.status(500).send('An error occurred while fetching data.');
      } else {
        res.send(results);
      }
    });
  });

  app.get('/display', (_req, res) => {
    connection.query('SELECT * FROM helment', (error, results) => {
      if (error) {
        console.error('Error fetching data from MySQL database:', error);
        res.status(500).send('An error occurred while fetching data.');
      } else {
        res.send(results);
      }
    });
  });


// Route to fetch and display data
app.get('/data', (req, res) => {
    connection.query('SELECT * FROM helment', (error, results) => {
      if (error) {
        console.error('Error fetching data from MySQL database:', error);
        res.status(500).send('An error occurred while fetching data.');
      } else {
        res.send(results);
      }
    });
  });
  

app.get('/detail/json', (req, res) => {
    res.json({ message: 'detail page' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});