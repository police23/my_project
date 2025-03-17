import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login-Signup.css';
import email_icon from '../../images/email.png';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email) {
            alert('Vui lòng nhập email');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Mã OTP đã được gửi đến email của bạn');
                navigate('/verify-otp', { state: { email } });
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Quên mật khẩu</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt="email_icon" className="icon" />
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='submit-container'>
                <button className="submit" onClick={handleSubmit}>
                    Gửi yêu cầu
                </button>
                <div
                    className="toggle-action"
                    onClick={() => navigate('/login')}
                    style={{ marginTop: '10px' }}
                >
                    Quay lại đăng nhập
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
