const pool = require('./config/dbConfig');

async function setupTestTables() {
    try {
        // Tạo bảng test_contents
        await pool.query(`
            CREATE TABLE IF NOT EXISTS test_contents (
                id INT AUTO_INCREMENT PRIMARY KEY,
                test_id INT NOT NULL,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE
            )
        `);
        console.log('Bảng test_contents đã được tạo/kiểm tra');

        // Tạo bảng questions
        await pool.query(`
            CREATE TABLE IF NOT EXISTS questions (
                question_id INT AUTO_INCREMENT PRIMARY KEY,
                test_id INT NOT NULL,
                question_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE
            )
        `);
        console.log('Bảng questions đã được tạo/kiểm tra');

        // Tạo bảng answers
        await pool.query(`
            CREATE TABLE IF NOT EXISTS answers (
                answer_id INT AUTO_INCREMENT PRIMARY KEY,
                question_id INT NOT NULL,
                answer_text TEXT NOT NULL,
                is_correct BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
            )
        `);
        console.log('Bảng answers đã được tạo/kiểm tra');

        console.log('Thiết lập các bảng thành công!');
    } catch (error) {
        console.error('Lỗi khi tạo bảng:', error);
    } finally {
        process.exit();
    }
}

setupTestTables();
