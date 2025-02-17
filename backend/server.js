const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON bodies
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: "Hello from backend!" });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});