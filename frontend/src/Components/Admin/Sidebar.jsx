import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <h2>{collapsed ? 'A' : 'ADMIN'}</h2>
                <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
                    ☰
                </button>
            </div>

            <div className="sidebar-menu">
                <Link to="/admin" className="menu-item">
                    <div className="menu-icon">
                        🏠
                    </div>
                    {!collapsed && <span>Trang chủ</span>}
                </Link>

                <Link to="/admin/users" className="menu-item">
                    <div className="menu-icon">
                        👥
                    </div>
                    {!collapsed && <span>Quản lý người dùng</span>}
                </Link>

                {/* Đảm bảo sử dụng /exams thay vì /tests */}
                <Link to="/admin/exams" className="menu-item">
                    <div className="menu-icon">
                        📝
                    </div>
                    {!collapsed && <span>Quản lý đề thi</span>}
                </Link>

                <Link to="/admin/statistics" className="menu-item">
                    <div className="menu-icon">
                        📊
                    </div>
                    {!collapsed && <span>Thống kê</span>}
                </Link>

                <Link to="/admin/settings" className="menu-item">
                    <div className="menu-icon">
                        ⚙️
                    </div>
                    {!collapsed && <span>Cài đặt</span>}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
