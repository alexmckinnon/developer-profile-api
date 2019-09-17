const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Set up body-parser to accept json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start server and listen on port 80
app.listen(80);

// Set up sqlite database
let db = new sqlite3.Database('developer-profile.db', (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    db.run(`CREATE TABLE IF NOT EXISTS users (
        email text UNIQUE,
        linkedin text,
        github text
    )`, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
});

/**
 * Retrieve user data
 * Returns json data containing user account names
 */
app.get('/user/:email', (req, res) => {
    let sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [req.params.email], (err, row) => {
        // Error running query
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        // No results found
        if (!row) {
            return res.status(404).json({ "error": "No user found" });
        }
        // Return json data
        res.json({ "data": row });
    })
})

/**
 * Store user data
 */
app.post('/user', (req, res) => {
    const data = req.body.data;
    const {email, github, linkedin} = data;
    if (!email || !github || !linkedin) {
        return res.status(400).json({ "error": "Missing parameters" });
    }
    // Check for existing user
    let sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
        // Error running query
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        // User already exists
        if (row) {
            return res.status(409).json({ "error": "User already exists" });
        } else {
            // Save new user
            let stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?)');
            stmt.run(email, github, linkedin);
            stmt.finalize();
            return res.status(201).end();
        }
    })
})
