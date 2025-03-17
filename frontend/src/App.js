import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import LoginSignup from './Components/Login-Signup/Login-Signup';
import ForgetPassword from './Components/Login-Signup/ForgetPassword';
import VerifyOTP from './Components/Login-Signup/VerifyOTP';
import ResetPassword from './Components/Login-Signup/ResetPassword';
import Dashboard from './Components/Admin/Dashboard';

const ProtectedAdminRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role_id === 0 ? element : <Navigate to="/login" />;
};

function App() {
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log('User logged in:', JSON.parse(storedUser).username);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/signup" element={<LoginSignup />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Admin routes - Bảo vệ với ProtectedAdminRoute */}
                    <Route path="/admin/*" element={<ProtectedAdminRoute element={<Dashboard />} />} />
                    <Route path="/dashboard" element={<div>User Dashboard (Coming Soon)</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;