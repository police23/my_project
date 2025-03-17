import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Login-Signup.css';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async () => {
        if (!otp || otp.length !== 6) {
            alert('Vui lòng nhập mã OTP 6 chữ số');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Xác thực thành công');
                navigate('/reset-password', { state: { email, token: data.token } });
            } else {
                alert(data.message || 'Mã OTP không chính xác');
            }
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Xác thực OTP</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input
                        type="text"
                        placeholder="Nhập mã OTP 6 chữ số"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    />
                </div>
            </div>
            <div className='submit-container'>
                <button className="submit" onClick={handleSubmit}>
                    Xác nhận
                </button>
                <div
                    className="toggle-action"
                    onClick={() => navigate('/forget-password')}
                >
                    Gửi lại mã
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
