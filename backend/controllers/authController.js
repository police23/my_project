const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const OtpModel = require('../models/otpModel');
const { sendPasswordResetEmail, sendOTPEmail } = require('../services/emailService');

class AuthController {
    static async register(req, res) {
        try {
            const { username, password, email, last_name, first_name, dob, tel, gender } = req.body;
            console.log('Received registration data:', req.body);

            if (!username || !password || !email || !last_name || !first_name) {
                return res.status(400).json({
                    message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
                });
            }

            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({
                    message: 'Tên đăng nhập đã tồn tại'
                });
            }

            const existingEmail = await UserModel.findByEmail(email);
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Email đã được sử dụng'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user with proper date format and role_id = 2
            const userData = {
                username,
                password: hashedPassword,
                email,
                last_name,
                first_name,
                dob: dob || null,
                tel: tel || null,
                gender: gender || 0

            };

            console.log('Processed user data:', userData); // Log để debug

            const result = await UserModel.create(userData);
            console.log('Database result:', result); // Log để debug

            res.status(201).json({
                message: 'Đăng ký tài khoản thành công'
            });
        } catch (err) {
            console.error('Registration error details:', err); // Log chi tiết lỗi
            res.status(500).json({
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
                error: err.message // Thêm chi tiết lỗi trong response
            });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng'
                });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng'
                });
            }

            // Log thông tin để debug
            console.log('User logged in:', {
                id: user.id,
                username: user.username,
                role_id: user.role_id
            });

            // Trả về thông tin người dùng và role_id
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role_id: user.role_id // Sử dụng role_id thay vì role
                }
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
            });
        }
    }

    static async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            console.log('Received forget password request for email:', email);

            if (!email) {
                return res.status(400).json({
                    message: 'Vui lòng nhập email'
                });
            }

            // Kiểm tra email tồn tại
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    message: 'Email không tồn tại trong hệ thống'
                });
            }

            // Tạo mật khẩu mới
            const newPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu mới trong database
            await UserModel.updatePassword(user.id, hashedPassword);

            // Gửi email
            await sendPasswordResetEmail(email, newPassword);

            res.status(200).json({
                message: 'Mật khẩu mới đã được gửi vào email của bạn'
            });
        } catch (err) {
            console.error('Forget password error:', err);
            res.status(500).json({
                message: 'Không thể gửi email. Vui lòng thử lại sau'
            });
        }
    }

    static async sendOTP(req, res) {
        try {
            const { email } = req.body;
            console.log('Processing OTP request for email:', email);

            if (!email) {
                return res.status(400).json({
                    message: 'Vui lòng nhập email'
                });
            }

            // Kiểm tra email tồn tại
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    message: 'Email không tồn tại trong hệ thống'
                });
            }

            // Tạo OTP 6 số
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Generated OTP:', otp);

            // Lưu OTP vào database
            await OtpModel.create(email, otp);
            console.log('OTP saved to database');

            // Gửi OTP qua email
            await sendOTPEmail(email, otp);
            console.log('OTP email sent');

            res.status(200).json({
                message: 'Mã OTP đã được gửi đến email của bạn'
            });
        } catch (err) {
            console.error('Detailed send OTP error:', err);
            res.status(500).json({
                message: 'Có lỗi xảy ra, vui lòng thử lại sau',
                error: err.message
            });
        }
    }

    static async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;

            const otpRecord = await OtpModel.verify(email, otp);
            if (!otpRecord) {
                return res.status(400).json({
                    message: 'Mã OTP không hợp lệ hoặc đã hết hạn'
                });
            }

            await OtpModel.markAsUsed(otpRecord.id);

            // Tạo token để sử dụng cho reset password
            const token = Math.random().toString(36).substring(7);

            res.status(200).json({
                message: 'Xác thực OTP thành công',
                token
            });
        } catch (err) {
            console.error('Verify OTP error:', err);
            res.status(500).json({
                message: 'Có lỗi xảy ra, vui lòng thử lại sau'
            });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { email, token, password } = req.body;

            // Kiểm tra email tồn tại
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    message: 'Email không tồn tại trong hệ thống'
                });
            }

            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cập nhật mật khẩu mới
            await UserModel.updatePassword(user.id, hashedPassword);

            res.status(200).json({
                message: 'Đổi mật khẩu thành công'
            });
        } catch (err) {
            console.error('Reset password error:', err);
            res.status(500).json({
                message: 'Có lỗi xảy ra, vui lòng thử lại sau'
            });
        }
    }
}

module.exports = AuthController;
