import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/auth/loginPage'
import Register from '../pages/auth/registerPage'
import ResetPassword from '../pages/auth/resetPasswordPage'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Visitors from '../pages/Visitors'
import Attendance from '../pages/Attendance'
import Users from '../pages/Users'

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold text-black">Reports</h1><p className="text-gray-600">Reports features coming soon.</p></div>} />
        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold text-black">Settings</h1><p className="text-gray-600">Settings features coming soon.</p></div>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes