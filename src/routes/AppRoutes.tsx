import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Visitors from '../pages/Visitors'
import Attendance from '../pages/Attendance'
import UserDetails from '../pages/users/UserDetail'

import SubBillingsPage from '../pages/Sub&billing'
import ApprovePage from '../pages/Approval'
import AppointmentPage from '../pages/Appointment'
import ReportPage from '../pages/Report'
import SystemHealthly from '../pages/system-healthly'
import Notifications from '../pages/Notification'
import Settings from '../pages/Setting'
import SecurityPage from '../pages/security'
import Users from '../pages/users/User'
import Login from '../pages/auth/LoginPage'
import Register from '../pages/auth/RegisterPage'
import ResetPassword from '../pages/auth/ResetPasswordPage'
import LiveMonitoringPage from '../pages/Live-monitoring'
import Hostmanagement from '../pages/Host'



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
        <Route path="liveMonitoring" element={<LiveMonitoringPage />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="hosts" element={<Hostmanagement/>}/>
        <Route path="billings" element={<SubBillingsPage/>}/>
        <Route path="approvals" element={<ApprovePage/>}/>
        <Route path="appointments" element={<AppointmentPage/>}/>
        <Route path="reports" element={<ReportPage/>}/>
        <Route path="system-health" element={<SystemHealthly/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        <Route path="security" element={<SecurityPage/>}/>
        <Route path="settings" element={<Settings />}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes