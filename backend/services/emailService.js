const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'haxuanbac244@gmail.com',
        pass: 'mvcj quks fnwo qwvl'
    }
});

const sendPasswordResetEmail = async (email, newPassword) => {
    try {
        const mailOptions = {
            from: 'haxuanbac244@gmail.com',
            to: email,
            subject: 'Mật khẩu mới của bạn',
            html: `
                <h1>Mật khẩu mới của bạn</h1>
                <p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>
                <p>Vui lòng đăng nhập và đổi mật khẩu ngay lập tức.</p>
                <p>Đây là email tự động, vui lòng không trả lời.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Detailed email error:', error);
        throw new Error('Không thể gửi email: ' + error.message);
    }
};

const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: 'haxuanbac244@gmail.com',
            to: email,
            subject: 'Mã OTP đặt lại mật khẩu',
            html: `
                <h1>Mã OTP của bạn</h1>
                <p>Mã OTP để đặt lại mật khẩu là: <strong>${otp}</strong></p>
                <p>Mã này sẽ hết hạn sau 5 phút.</p>
                <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Send OTP email error:', error);
        throw error;
    }
};

// Test connection khi khởi động server
transporter.verify(function (error, success) {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

module.exports = {
    sendPasswordResetEmail,
    sendOTPEmail
};
