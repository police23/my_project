const UserModel = require('../models/userModel');

class UserController {
    static async getAllUsers(req, res) {
        try {
            console.log('Đang lấy danh sách người dùng...');
            const users = await UserModel.getAllUsers();
            console.log(`Đã lấy được ${users.length} người dùng`);
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách người dùng' });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin người dùng' });
        }
    }
}

module.exports = UserController;
