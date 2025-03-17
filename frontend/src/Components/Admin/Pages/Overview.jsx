import React from 'react';
import { FaUsers, FaClipboardList, FaChartBar } from 'react-icons/fa';

const Overview = () => {
    return (
        <div className="overview-page">
            <h2>Tổng quan</h2>

            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon"><FaUsers /></div>
                    <div className="stat-info">
                        <h3>Người dùng</h3>
                        <p className="stat-value">1,245</p>
                        <p className="stat-change positive">+12% so với tuần trước</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon"><FaClipboardList /></div>
                    <div className="stat-info">
                        <h3>Đề thi</h3>
                        <p className="stat-value">86</p>
                        <p className="stat-change positive">+5% so với tuần trước</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon"><FaChartBar /></div>
                    <div className="stat-info">
                        <h3>Bài làm</h3>
                        <p className="stat-value">3,871</p>
                        <p className="stat-change positive">+18% so với tuần trước</p>
                    </div>
                </div>
            </div>

            <div className="recent-activity">
                <h2>Hoạt động gần đây</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-time">12:30</div>
                        <div className="activity-content">
                            <strong>Người dùng mới</strong> đã đăng ký
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-time">11:45</div>
                        <div className="activity-content">
                            <strong>Đề thi mới</strong> đã được tạo
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-time">10:20</div>
                        <div className="activity-content">
                            <strong>Người dùng</strong> đã hoàn thành bài thi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
