import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Login-Signup.css';
import password_icon from '../../images/password.png';
import eye_icon from '../../images/eye.png';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email, token } = location.state || {};

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Đổi mật khẩu thành công');
                navigate('/login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Đặt lại mật khẩu</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={password_icon} alt="password" className="icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                        src={eye_icon}
                        alt="toggle"
                        className="icon toggle-eye"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="password" className="icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <img
                        src={eye_icon}
                        alt="toggle"
                        className="icon toggle-eye"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
            </div>
            <div className='submit-container'>
                <button className="submit" onClick={handleSubmit}>
                    Cập nhật mật khẩu
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
