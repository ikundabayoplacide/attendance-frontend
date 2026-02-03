import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Visitors from '../pages/vistors/Visitors'
import Attendance from '../pages/Attendance'
import UserDetails from '../pages/users/UserDetail'

import ApprovePage from '../pages/Approval'
import AppointmentPage from '../pages/Appointment'
import SystemHealthly from '../pages/system-healthly'
import Notifications from '../pages/Notification'
import Settings from '../pages/Setting'
import SecurityPage from '../pages/security'
import Login from '../pages/auth/LoginPage'
import Register from '../pages/auth/RegisterPage'
import ResetPassword from '../pages/auth/ResetPasswordPage'
import LiveMonitoringPage from '../pages/Live-monitoring'
import Hostmanagement from '../pages/Host'
import Customers from '../pages/customers/Customers'
import CustomerDetail from '../pages/customers/CustomerDetail'
import SubBillingsPage from '../pages/Sub&billing'
import Users from '../pages/users/User'
import BusinessAnalytics from '../pages/Business-Analytics'
import ReportPage from '../pages/Reports'


function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Dashboard Routes - Role-based routing handled by URL params */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        
        {/* System Owner Routes */}
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="billings" element={<SubBillingsPage/>}/>
        <Route path="system-health" element={<SystemHealthly/>}/>
        <Route path='system-reports' element={<ReportPage/>}/>
        
        {/* Customer Routes */}
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="livemonitoring" element={<LiveMonitoringPage />} />
        <Route path="hosts" element={<Hostmanagement/>}/>
        <Route path="approvals" element={<ApprovePage/>}/>
        <Route path="appointments" element={<AppointmentPage/>}/>
        
        {/* Shared Routes */}
        <Route path="Analytics" element={<BusinessAnalytics/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        <Route path="security" element={<SecurityPage/>}/>
        <Route path="settings" element={<Settings />}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes