import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';
import { FaUserCircle } from 'react-icons/fa';

// Import pages
import Overview from './Pages/Overview';
import UserManagement from './Pages/UserManagement';
import TestManagement from './Pages/TestManagement';
import AddTestSkillSelect from './Pages/AddTestSkillSelect';
import AddTest from './Pages/AddTest';
import Statistics from './Pages/Statistics';
import Settings from './Pages/Settings';

// Modal xác nhận đăng xuất với hiệu ứng đẹp mắt
const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    const [isExiting, setIsExiting] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            onClose();
        }, 300); // Thời gian hoàn tất hiệu ứng thoát
    };

    const handleConfirm = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            onConfirm();
        }, 300);
    };

    return (
        <div className={`modal-overlay ${isExiting ? 'modal-exit' : ''}`}>
            <div className={`modal-content ${isExiting ? 'modal-content-exit' : ''}`}>
                <h2>Xác nhận</h2>
                <p>Bạn có chắc chắn muốn đăng xuất?</p>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={handleConfirm}>Có</button>
                    <button className="modal-button cancel" onClick={handleClose}>Không</button>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    // Lấy thông tin người dùng từ localStorage

    // Mở modal xác nhận đăng xuất
    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    // Đóng modal
    const closeModal = () => {
        setShowLogoutModal(false);
    };

    // Xử lý đăng xuất khi người dùng xác nhận
    const confirmLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('user');
        // Chuyển hướng về trang đăng nhập
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Quản trị hệ thống</h1>
                    <div className="user-info">
                        <span>{user ? `${user.last_name} ${user.first_name}` : 'Admin'}</span>
                        <FaUserCircle size={24} color="#666" />
                        <button className="logout-btn" onClick={handleLogoutClick}>Đăng xuất</button>
                    </div>
                </div>
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/exams" element={<TestManagement />} />
                        <Route path="/exams/new" element={<AddTestSkillSelect />} />
                        <Route path="/exams/new/:skillId" element={<AddTest />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>

            {/* Modal xác nhận đăng xuất */}
            <LogoutConfirmModal
                isOpen={showLogoutModal}
                onClose={closeModal}
                onConfirm={confirmLogout}
            />
        </div>
    );
};

export default Dashboard;
