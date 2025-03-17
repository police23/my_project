const pool = require('../config/dbConfig');

class TestModel {
    static async getAllTests() {
        try {
            const [rows] = await pool.query(`
                SELECT t.*, s.skill_name 
                FROM tests t
                LEFT JOIN skills s ON t.skill_id = s.skill_id 
                ORDER BY t.created_at DESC
            `);
            return rows;
        } catch (error) {
            console.error('Error in TestModel.getAllTests:', error);
            throw error;
        }
    }

    static async getTestById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM tests WHERE test_id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error in TestModel.getTestById:', error);
            throw error;
        }
    }

    static async create(testData) {
        try {
            const { test_name, skill_id, audio_url, description, difficulty, duration, content } = testData;

            // Lấy user_id từ thông tin người dùng đăng nhập (giả sử là 1 cho demo)
            const created_by = 1;

            const query = `
                INSERT INTO tests 
                (test_name, skill_id, audio_url, description, difficulty, duration, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const [result] = await pool.query(query, [
                test_name,
                skill_id,
                audio_url || null,
                description || null,
                difficulty || 1,
                duration || 30,
                created_by
            ]);

            // Lưu nội dung đề thi nếu có
            if (content) {
                await pool.query(`
                    INSERT INTO test_contents (test_id, content) VALUES (?, ?)
                `, [result.insertId, content]);
            }

            // Lưu câu hỏi nếu có
            if (testData.questions && testData.questions.length > 0) {
                for (const question of testData.questions) {
                    // Thêm câu hỏi
                    const [questionResult] = await pool.query(`
                        INSERT INTO questions (test_id, question_text) 
                        VALUES (?, ?)
                    `, [result.insertId, question.question]);

                    // Thêm các lựa chọn
                    if (question.options && question.options.length > 0) {
                        for (let i = 0; i < question.options.length; i++) {
                            await pool.query(`
                                INSERT INTO answers (question_id, answer_text, is_correct) 
                                VALUES (?, ?, ?)
                            `, [
                                questionResult.insertId,
                                question.options[i],
                                i === question.correct_answer ? 1 : 0
                            ]);
                        }
                    }
                }
            }

            return result.insertId;
        } catch (error) {
            console.error('Error in TestModel.create:', error);
            throw error;
        }
    }
}

module.exports = TestModel;
