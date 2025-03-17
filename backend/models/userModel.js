const pool = require('../config/dbConfig');

class UserModel {
    static async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        try {
            const { last_name, first_name, username, dob, tel, gender, email, password } = userData;

            const query = `
                INSERT INTO users 
                (last_name, first_name, username, dob, tel, gender, email, password, role_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 2)
            `;
            console.log('SQL Query:', query);
            console.log('Query parameters:', [last_name, first_name, username, dob, tel, gender, email, password]);
            const [result] = await pool.query(query, [
                last_name,
                first_name,
                username,
                dob || null,
                tel,
                gender || 0,
                email,
                password
            ]);
            return result;

        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }

    static async updatePassword(userId, newPassword) {
        const [result] = await pool.query(
            'UPDATE users SET password = ? WHERE user_id = ?',
            [newPassword, userId]
        );
        return result;
    }

    static async getAllUsers() {
        try {
            const [rows] = await pool.query(`
                SELECT user_id, last_name, first_name, username, email, role_id, created_at
                FROM users
                WHERE role_id > 0
                ORDER BY created_at DESC
            `);
            return rows;
        } catch (error) {
            console.error('Error in UserModel.getAllUsers:', error);
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error in UserModel.getUserById:', error);
            throw error;
        }
    }
}

module.exports = UserModel;
