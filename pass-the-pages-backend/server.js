const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // import the DB connection

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests

const port = 5000; // or any port you choose

// JWT Secret Key
const JWT_SECRET = 'your-secret-key';

// Register route for user sign-up
app.post('/register', async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;

    if (!email.includes('@kean.edu')) {
        return res.status(400).json({ message: 'Email must be a @kean.edu email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, email, hashedPassword, first_name, last_name]
        );
        const user = result.rows[0];

        // Generate JWT token for authentication
        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login route for user sign-in
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Middleware to verify JWT token and extract user information
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Example of a route that requires user to be authenticated
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.user.user_id]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Book listing route (for authenticated users)
app.post('/books', verifyToken, async (req, res) => {
    const { title, author, course_relevance, condition, description } = req.body;
    const owner_user_id = req.user.user_id;

    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, course_relevance, condition, description, owner_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, course_relevance, condition, description, owner_user_id]
        );
        const book = result.rows[0];
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get list of books
app.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE is_available = TRUE');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
