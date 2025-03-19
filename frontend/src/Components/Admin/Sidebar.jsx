import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
                <NavLink to="/admin" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                    <div className="menu-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg></div>
                    {!collapsed && <span>Trang chủ</span>}
                </NavLink>

                <NavLink to="/admin/users" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" /></svg></div>
                    {!collapsed && <span>Quản lý người dùng</span>}
                </NavLink>

                <NavLink to="/admin/exams" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-icon">✎</div>
                    {!collapsed && <span>Quản lý đề thi</span>}
                </NavLink>

                <NavLink to="/admin/statistics" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-icon">☷</div>
                    {!collapsed && <span>Thống kê</span>}
                </NavLink>

                <NavLink to="/admin/settings" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-icon">⚙</div>
                    {!collapsed && <span>Cài đặt</span>}
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
