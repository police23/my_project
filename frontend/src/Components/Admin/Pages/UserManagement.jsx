import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roleFilter, setRoleFilter] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                console.log("Đang gọi API lấy danh sách người dùng...");

                // Kiểm tra xem API có hoạt động không
                const checkResponse = await fetch('http://localhost:4000/api/check')
                    .catch(e => {
                        console.error("Không thể kết nối tới server:", e);
                        throw new Error("Không thể kết nối tới server. Vui lòng kiểm tra server đã chạy chưa.");
                    });

                if (!checkResponse.ok) {
                    throw new Error("Server không phản hồi đúng cách");
                }

                const response = await fetch('http://localhost:4000/api/users');
                console.log("API response status:", response.status);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Không thể tải danh sách người dùng');
                }

                const data = await response.json();
                console.log("Dữ liệu nhận được:", data);
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    // Xác định vai trò người dùng từ role_id
    const getUserRole = (roleId) => {
        switch (roleId) {
            case 0: return 'Admin';
            case 1: return 'Giáo viên';
            case 2: return 'Học sinh';
            default: return 'Không xác định';
        }
    };

    // Lọc người dùng theo các tiêu chí
    const filteredUsers = users.filter(user => {
        // Lọc theo tìm kiếm
        const searchMatch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${user.last_name} ${user.first_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        // Lọc theo vai trò
        const roleMatch = roleFilter === '' || getUserRole(user.role_id).toLowerCase() === roleFilter.toLowerCase();

        return searchMatch && roleMatch;
    });

    return (
        <div className="user-management">
            <div className="page-header">
                <h2>Quản lý người dùng</h2>
                <button className="add-button">
                    <FaPlus /> Thêm người dùng
                </button>
            </div>

            <div className="search-filter">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button><FaSearch /></button>
                </div>
                <div className="filter-options">
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="">Tất cả vai trò</option>
                        <option value="giáo viên">Giáo viên</option>
                        <option value="học sinh">Học sinh</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading">Đang tải danh sách người dùng...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="users-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên đăng nhập</th>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.username}</td>
                                        <td>{`${user.last_name} ${user.first_name}`}</td>
                                        <td>{user.email}</td>
                                        <td>{getUserRole(user.role_id)}</td>
                                        <td>
                                            <div className="actions">
                                                <button className="edit-btn"><FaEdit /></button>
                                                <button className="delete-btn"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>Không tìm thấy người dùng</td>
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

export default UserManagement;
