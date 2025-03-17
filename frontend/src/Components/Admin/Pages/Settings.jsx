import React, { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        siteName: 'Hệ thống thi trực tuyến',
        allowRegistration: true,
        requireEmailVerification: true,
        maxLoginAttempts: 5,
        sessionTimeout: 30
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Cài đặt đã được lưu!');
    };

    return (
        <div className="settings-page">
            <h2>Cài đặt hệ thống</h2>

            <form onSubmit={handleSubmit}>
                <div className="settings-section">
                    <h3>Cài đặt chung</h3>

                    <div className="form-group">
                        <label>Tên trang web:</label>
                        <input
                            type="text"
                            name="siteName"
                            value={settings.siteName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Cài đặt người dùng</h3>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            id="allowRegistration"
                            name="allowRegistration"
                            checked={settings.allowRegistration}
                            onChange={handleChange}
                        />
                        <label htmlFor="allowRegistration">Cho phép đăng ký tài khoản mới</label>
                    </div>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            id="requireEmailVerification"
                            name="requireEmailVerification"
                            checked={settings.requireEmailVerification}
                            onChange={handleChange}
                        />
                        <label htmlFor="requireEmailVerification">Yêu cầu xác minh email</label>
                    </div>

                    <div className="form-group">
                        <label>Số lần đăng nhập thất bại tối đa:</label>
                        <input
                            type="number"
                            name="maxLoginAttempts"
                            min="1"
                            max="10"
                            value={settings.maxLoginAttempts}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Thời gian hết hạn phiên (phút):</label>
                        <input
                            type="number"
                            name="sessionTimeout"
                            min="5"
                            value={settings.sessionTimeout}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-button">Lưu cài đặt</button>
                    <button type="button" className="reset-button">Khôi phục mặc định</button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
