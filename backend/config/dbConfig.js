const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myproject',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test connection
promisePool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(error => {
        console.error('Database connection failed:', error);
    });

module.exports = promisePool;
