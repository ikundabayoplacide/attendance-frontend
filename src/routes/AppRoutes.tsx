import { Routes, Route } from 'react-router-dom'
import Home from '../pages/dashboard/Home'

import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Visitors from '../pages/dashboard/vistors/Visitors'
import Attendance from '../pages/dashboard/attendance/Attendance'
import UserDetails from '../pages/dashboard/users/UserDetail'

import ApprovePage from '../pages/dashboard/approval/Approval'
import SystemHealthly from '../pages/dashboard/healthly'
import Notifications from '../pages/dashboard/notifications/Notification'
import Settings from '../pages/dashboard/settings/Setting'
import Login from '../pages/auth/LoginPage'
import Register from '../pages/auth/RegisterPage'
import ResetPassword from '../pages/auth/ResetPasswordPage'
import Hostmanagement from '../pages/dashboard/hosting/Host'
import Customers from '../pages/dashboard/accounts'
import ActiveCustomers from '../pages/dashboard/accounts/active'
import InactiveCustomers from '../pages/dashboard/accounts/inactive'
import SuspendedCustomers from '../pages/dashboard/accounts/suspended'
import BlacklistedCustomers from '../pages/dashboard/accounts/blacklisted'
import CustomerDetail from '../pages/dashboard/accounts/CustomerDetail'
import SubBillingsPage from '../pages/dashboard/payment/Sub&billing'
import Users from '../pages/dashboard/users/User'
import BusinessAnalytics from '../pages/dashboard/analytics/Business-Analytics'
import ReportPage from '../pages/dashboard/reports/Reports'
import ScanningPage from '../pages/dashboard/vistors/ScanningPage'
import EventsPage from '../pages/dashboard/events/Events'
import Equipment from '../pages/dashboard/equipments/Equipment'
import AppointmentPage from '../pages/dashboard/appointment/Appointment'
import FormPage from '../pages/dashboard/forms'
import CreateForm from '../pages/dashboard/forms/CreateForm'
import Security from '../pages/dashboard/security'


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
        <Route path="customers/active" element={<ActiveCustomers />} />
        <Route path="customers/inactive" element={<InactiveCustomers />} />
        <Route path="customers/suspended" element={<SuspendedCustomers />} />
        <Route path="customers/blacklisted" element={<BlacklistedCustomers />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="billings" element={<SubBillingsPage/>}/>
        <Route path="system-health" element={<SystemHealthly/>}/>
        <Route path='forms' element={<FormPage/>}/>
        <Route path='forms/create' element={<CreateForm/>}/>
        <Route path='system-reports' element={<ReportPage/>}/>
        <Route path='security' element={<Security/>}/>
        
        {/* Customer Routes */}
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="scanning" element={<ScanningPage />} />
        <Route path="events" element={<EventsPage/>}/>
        <Route path='equipments' element={<Equipment/>}/>
        <Route path="hosts" element={<Hostmanagement/>}/>
        <Route path="approvals" element={<ApprovePage/>}/>
        <Route path="appointments" element={<AppointmentPage/>}/>
        <Route path="reports" element={<ReportPage/>}/>

        
        {/* Shared Routes */}
        <Route path="Analytics" element={<BusinessAnalytics/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        <Route path="settings" element={<Settings />}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes