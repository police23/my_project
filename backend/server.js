const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const skillRoutes = require('./routes/skillRoutes');
const userRoutes = require('./routes/userRoutes'); // Thêm route mới
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
}));

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/api/check', (req, res) => {
    res.status(200).json({ message: 'API server is working' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});