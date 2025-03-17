import React from 'react';

const Statistics = () => {
    return (
        <div className="statistics-page">
            <h2>Thống kê</h2>

            <div className="stats-filter">
                <select>
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="year">Năm này</option>
                </select>
            </div>

            <div className="stats-charts">
                <div className="chart-container">
                    <h3>Người dùng mới</h3>
                    <div className="chart">
                        {/* Placeholder for chart */}
                        <div className="chart-placeholder">
                            <p>Biểu đồ người dùng mới</p>
                        </div>
                    </div>
                </div>

                <div className="chart-container">
                    <h3>Đề thi mới</h3>
                    <div className="chart">
                        {/* Placeholder for chart */}
                        <div className="chart-placeholder">
                            <p>Biểu đồ đề thi mới</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-table">
                <h3>Thống kê môn học</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Môn học</th>
                            <th>Số đề thi</th>
                            <th>Số lượt làm bài</th>
                            <th>Điểm trung bình</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Toán</td>
                            <td>32</td>
                            <td>1,245</td>
                            <td>7.8</td>
                        </tr>
                        <tr>
                            <td>Văn</td>
                            <td>28</td>
                            <td>1,048</td>
                            <td>7.2</td>
                        </tr>
                        <tr>
                            <td>Tiếng Anh</td>
                            <td>26</td>
                            <td>1,578</td>
                            <td>8.1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Statistics;
