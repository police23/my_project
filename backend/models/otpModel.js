const pool = require('../config/dbConfig');

class OtpModel {
    static async create(email, otp) {
        try {
            console.log('Creating OTP in database for email:', email);

            const [tables] = await pool.query(
                "SHOW TABLES LIKE 'otp_codes'"
            );

            if (tables.length === 0) {
                console.log('Table otp_codes does not exist, creating...');
                await pool.query(`
                    CREATE TABLE otp_codes (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR(255) NOT NULL,
                        code VARCHAR(6) NOT NULL,
                        expires_at DATETIME NOT NULL,
                        is_used BOOLEAN DEFAULT false,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `);
                console.log('Table otp_codes created successfully');
            }

            const expiryTime = new Date(Date.now() + 5 * 60000);

            const insertQuery = `
                INSERT INTO otp_codes (email, code, expires_at) 
                VALUES (?, ?, ?)
            `;

            const [result] = await pool.query(insertQuery, [email, otp, expiryTime]);
            console.log('OTP inserted successfully:', result);

            return result;
        } catch (error) {
            console.error('Error in OtpModel.create:', error);
            throw error;
        }
    }

    static async verify(email, otp) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM otp_codes 
                WHERE email = ? AND code = ? AND expires_at > NOW() AND is_used = 0
                ORDER BY created_at DESC
                LIMIT 1
            `, [email, otp]);

            console.log('Verifying OTP for email:', email, 'Result:', rows[0]);
            return rows[0];
        } catch (error) {
            console.error('Error in OtpModel.verify:', error);
            throw error;
        }
    }

    static async markAsUsed(id) {
        try {
            await pool.query('UPDATE otp_codes SET is_used = 1 WHERE id = ?', [id]);
            console.log('OTP marked as used, id:', id);
        } catch (error) {
            console.error('Error in OtpModel.markAsUsed:', error);
            throw error;
        }
    }
}


console.log('OtpModel loaded with methods:', Object.getOwnPropertyNames(OtpModel));

module.exports = OtpModel;
