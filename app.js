const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()

// Start server and listen on port 80
app.listen(80)

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
            console.log(err.message)
            return;
        }
        // db.run(`INSERT INTO users (email, linkedin, github) 
        //         VALUES ("admin@example.com","admin", "admin")`)
    });
});

/**
 * Retrieve user data
 * Returns json data containing user account names
 * @param {String} email
 * @returns {String}
 */
app.get('/user/:email', (req, res) => {
    let sql = "SELECT * FROM users WHERE email = ?"
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
        res.json({ "data": row })
    })
})

/**
 * Store user data
 */
app.post('/user', (req, res) => {
    // Save user data here
})
