const pool = require('./config/dbConfig');

async function setupDatabase() {
    try {
        // Tạo bảng skills nếu chưa tồn tại
        await pool.query(`
            CREATE TABLE IF NOT EXISTS skills (
                skill_id INT AUTO_INCREMENT PRIMARY KEY,
                skill_name VARCHAR(100) NOT NULL,
                description TEXT
            )
        `);
        console.log("Bảng skills đã được kiểm tra/tạo");

        // Kiểm tra nếu bảng trống thì thêm dữ liệu mẫu
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM skills');
        if (rows[0].count === 0) {
            await pool.query(`
                INSERT INTO skills (skill_name, description) VALUES
                ('Listening', 'Kỹ năng nghe'),
                ('Speaking', 'Kỹ năng nói'),
                ('Reading', 'Kỹ năng đọc'),
                ('Writing', 'Kỹ năng viết')
            `);
            console.log("Đã thêm dữ liệu mẫu vào bảng skills");
        }

        // Tạo bảng tests nếu chưa tồn tại
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tests (
                test_id INT AUTO_INCREMENT PRIMARY KEY,
                test_name VARCHAR(255) NOT NULL,
                skill_id INT,
                audio_url VARCHAR(255),
                description TEXT,
                difficulty INT DEFAULT 1,
                duration INT,
                created_by INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
            )
        `);
        console.log("Bảng tests đã được kiểm tra/tạo");

        console.log("Thiết lập cơ sở dữ liệu hoàn tất");
    } catch (error) {
        console.error("Lỗi thiết lập cơ sở dữ liệu:", error);
    }
}

// Chạy setup
setupDatabase()
    .then(() => {
        console.log("Database setup completed successfully");
        process.exit(0);
    })
    .catch(err => {
        console.error("Database setup failed:", err);
        process.exit(1);
    });
