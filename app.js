const express = require('express')
const app = express()

// Start server and listen on port 80
app.listen(80)


/**
 * Retrieve user data
 */
app.get('/user/:email', (req, res) => {
    res.send('User data...')
})

/**
 * Store user data
 */
app.post('/user', (req, res) => {
    // Save user data here
})