import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ExamManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/tests');
                if (!response.ok) {
                    throw new Error('Không thể tải danh sách đề thi');
                }
                const data = await response.json();
                setExams(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching exams:', err);
            }
        };

        fetchExams();
    }, []);

    // Format thời gian
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    // Format độ khó
    const formatDifficulty = (level) => {
        switch (level) {
            case 1: return 'Dễ';
            case 2: return 'Trung bình';
            case 3: return 'Khó';
            default: return 'Không xác định';
        }
    };

    // Tìm kiếm
    const filteredExams = exams.filter(exam =>
        exam.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exam.skill_name && exam.skill_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="exam-management">
            <div className="page-header">
                <h2>Quản lý đề thi</h2>
                <button className="add-button">
                    <FaPlus /> Thêm đề thi
                </button>
            </div>

            <div className="search-filter">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm đề thi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button><FaSearch /></button>
                </div>
                <div className="filter-options">
                    <select>
                        <option value="">Kĩ năng</option>
                        <option value="1">Nghe</option>
                        <option value="2">Nói</option>
                        <option value="3">Đọc</option>
                        <option value="4">Viết</option>
                    </select>
                    <select>
                        <option value="">Độ khó</option>
                        <option value="1">Dễ</option>
                        <option value="2">Trung bình</option>
                        <option value="3">Khó</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading">Đang tải danh sách đề thi...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="exams-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên đề thi</th>
                                <th>Kĩ năng</th>
                                <th>Độ khó</th>
                                <th>Thời gian</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.length > 0 ? (
                                filteredExams.map(exam => (
                                    <tr key={exam.test_id}>
                                        <td>{exam.test_id}</td>
                                        <td>{exam.test_name}</td>
                                        <td>{exam.skill_name || 'Không xác định'}</td>
                                        <td>{formatDifficulty(exam.difficulty)}</td>
                                        <td>{exam.duration} phút</td>
                                        <td>{formatDate(exam.created_at)}</td>
                                        <td>
                                            <div className="actions">
                                                <button className="view-btn" title="Xem"><FaEye /></button>
                                                <button className="edit-btn" title="Sửa"><FaEdit /></button>
                                                <button className="delete-btn" title="Xóa"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>Không có đề thi nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button>&laquo;</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&raquo;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamManagement;
