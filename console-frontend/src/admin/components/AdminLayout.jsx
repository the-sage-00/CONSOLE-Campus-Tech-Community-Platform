import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import UserManagement from '../pages/UserManagement';
import ParticipationStats from '../pages/ParticipationStats';

const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/participation-stats" element={<ParticipationStats />} />
    </Routes>
  );
};

export default AdminLayout;
