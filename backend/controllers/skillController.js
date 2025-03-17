const pool = require('../config/dbConfig');

class SkillController {
    static async getAllSkills(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM skills ORDER BY skill_id ASC');
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error getting skills:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách kỹ năng' });
        }
    }

    static async getSkillById(req, res) {
        try {
            const { id } = req.params;
            const [rows] = await pool.query('SELECT * FROM skills WHERE skill_id = ?', [id]);

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy kỹ năng' });
            }

            res.status(200).json(rows[0]);
        } catch (error) {
            console.error('Error getting skill by ID:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra' });
        }
    }
}

module.exports = SkillController;
