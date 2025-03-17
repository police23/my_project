import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Login-Signup.css';
import gen_icon from '../../images/icons8-gender-24.png';
import user_icon from '../../images/person.png';
import email_icon from '../../images/email.png';
import password_icon from '../../images/password.png';
import eye_icon from '../../images/eye.png';
import tel_icon from '../../images/icons8-telephone-24.png';

const LoginSignup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [action, setAction] = React.useState("Sign Up");
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        last_name: '',
        first_name: '',
        username: '',
        dob: '',
        tel: '',
        gender: '0',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Set default action based on route
    useEffect(() => {
        if (location.pathname === '/login') {
            setAction("Login");
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const url = `http://localhost:4000/api/auth${action === "Login" ? '/login' : '/register'}`;

        if (action === "Sign Up") {
            if (formData.password !== formData.confirmPassword) {
                alert("Mật khẩu không khớp!");
                return;
            }

            const dob = `${formData.year}-${String(formData.month).padStart(2, '0')}-${String(formData.day).padStart(2, '0')}`;

            const payload = {
                last_name: formData.last_name,
                first_name: formData.first_name,
                username: formData.username,
                dob: dob,
                tel: formData.tel,
                gender: parseInt(formData.gender),
                email: formData.email,
                password: formData.password
            };

            const requiredFields = ['last_name', 'first_name', 'username', 'email', 'password'];
            const missingFields = requiredFields.filter(field => !payload[field]);

            if (missingFields.length > 0) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
                alert(result.message);

                setFormData({
                    last_name: '',
                    first_name: '',
                    username: '',
                    dob: '',
                    tel: '',
                    gender: '0',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setAction("Login");
            } catch (error) {
                alert(error.message || 'Có lỗi xảy ra, vui lòng thử lại sau');
            }
        } else {
            const payload = {
                username: formData.username,
                password: formData.password
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }

                localStorage.setItem('user', JSON.stringify(result.user));
                if (result.user && result.user.role_id === 0) {
                    navigate('/admin');
                }
                else if (result.user && result.user.role_id == 1) {
                    navigate('/teacher');
                } else {
                    navigate('/dashboard');
                }
            } catch (error) {
                alert(error.message || 'Có lỗi xảy ra, vui lòng thử lại sau');
            }
        }
    };

    const currentYear = new Date().getFullYear();
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" ? (
                    <>
                        <div className="name-group">
                            <div className="form-group">
                                <div className="input">
                                    <img src={user_icon} alt="user_icon" className="icon" />
                                    <input
                                        type="text"
                                        placeholder="Họ"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input">
                                    <img src={user_icon} alt="user_icon" className="icon" />
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="input">
                            <img src={user_icon} alt="user_icon" className="icon" />
                            <input
                                type="text"
                                placeholder="Tên đăng nhập"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh:</label>
                            <div className="dob-group">
                                <select name="day" onChange={handleChange}>
                                    <option value="">Ngày</option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select name="month" onChange={handleChange}>
                                    <option value="">Tháng</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select name="year" onChange={handleChange}>
                                    <option value="">Năm</option>
                                    {Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="input">
                            <img src={tel_icon} alt="tel_icon" className="icon" />
                            <input
                                type="tel"
                                placeholder="Số điện thoại"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input gender-input">
                            <img src={gen_icon} alt="gen_icon" className="icon" />
                            <div className="gender-group">
                                <div className="gender-option">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="0"
                                            checked={formData.gender === '0'}
                                            onChange={handleChange}
                                        />
                                        <span>Nam</span>
                                    </label>
                                </div>
                                <div className="gender-option">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="1"
                                            checked={formData.gender === '1'}
                                            onChange={handleChange}
                                        />
                                        <span>Nữ</span>
                                    </label>
                                </div>
                                <div className="gender-option">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="2"
                                            checked={formData.gender === '2'}
                                            onChange={handleChange}
                                        />
                                        <span>Khác</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="input">
                            <img src={email_icon} alt="email_icon" className="icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="password_icon" className="icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <img
                                src={eye_icon}
                                alt="toggle visibility"
                                className="icon toggle-eye"
                                onClick={() => setShowPassword(prev => !prev)}
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="password_icon" className="icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <img
                                src={eye_icon}
                                alt="toggle visibility"
                                className="icon toggle-eye"
                                onClick={() => setShowPassword(prev => !prev)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="user_icon" className="icon" />
                            <input
                                type="text"
                                placeholder="Tên đăng nhập"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="password_icon" className="icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <img
                                src={eye_icon}
                                alt="toggle visibility"
                                className="icon toggle-eye"
                                onClick={() => setShowPassword(prev => !prev)}
                            />
                        </div>
                    </>
                )}
            </div>
            {action === "Sign Up" ? <div></div> : (
                <div className="forgot-password">
                    Forgot Password? <span onClick={() => navigate('/forget-password')}>Click here</span>
                </div>
            )}
            <div className='submit-container'>
                <button className="submit" onClick={handleSubmit}>
                    {action === "Login" ? "Đăng nhập" : "Đăng ký"}
                </button>
                <div className="toggle-action" onClick={() => { setAction(action === "Login" ? "Sign Up" : "Login") }}>
                    {action === "Login" ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;