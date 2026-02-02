import { FaHome, FaUsers, FaCalendarCheck, FaChartBar, FaCog, FaUserCheck, FaEye, FaExclamationTriangle, FaCalendarAlt, FaBell, FaServer, FaTimes, FaCreditCard } from 'react-icons/fa'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole?: 'owner' | 'customer'
}

function DashboardSidebar({ isOpen, onClose, userRole = 'owner' }: DashboardSidebarProps) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  
  // Preserve role parameter in navigation
  const roleParam = searchParams.get('role')
  const addRoleParam = (path: string) => {
    return roleParam ? `${path}?role=${roleParam}` : path
  }

  // System Owner menu items
  const systemOwnerItems = [
    { path: '/dashboard', icon: FaHome, label: 'Business Dashboard', exact: true },
    { path: '/dashboard/customers', icon: FaUsers, label: 'Customer Management' },
    { path: '/dashboard/billings', icon: FaCreditCard, label: 'Billing & Revenue' },
    { path: '/dashboard/reports', icon: FaChartBar, label: 'Business Analytics' },
    { path: '/dashboard/system-health', icon: FaServer, label: 'System Health' },
  ]

  // Customer menu items
  const customerItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard Overview', exact: true },
    { path: '/dashboard/users', icon: FaUsers, label: 'User Management' },
    { path: '/dashboard/visitors', icon: FaUsers, label: 'Visitor Management' },
    { path: '/dashboard/hosts', icon: FaUserCheck, label: 'Host Management' },
    { path: '/dashboard/approvals', icon: FaCalendarCheck, label: 'Visit Approvals' },
    { path: '/dashboard/appointments', icon: FaCalendarAlt, label: 'Appointments' },
    { path: '/dashboard/livemonitoring', icon: FaEye, label: 'Live Monitoring' },
    { path: '/dashboard/reports', icon: FaChartBar, label: 'Reports & Analytics' },
    { path: '/dashboard/notifications', icon: FaBell, label: 'Notifications' },
    { path: '/dashboard/security', icon: FaExclamationTriangle, label: 'Security & Alerts' }
  ]

  const menuItems = userRole === 'owner' ? systemOwnerItems : customerItems

  const settingsItem = { path: '/dashboard/settings', icon: FaCog, label: 'Settings' }

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`w-64 bg-[#1A3263] text-white h-full flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative z-50 lg:z-auto`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <nav className="flex-1 px-4 pt-10 flex flex-col min-h-0">
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden self-end mb-4 p-2 text-white hover:bg-white/10 rounded-lg"
        >
          <FaTimes size={18} />
        </button>
        <div className="flex-1 overflow-y-scroll min-h-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="space-y-4 pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Link
                    to={addRoleParam(item.path)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path, item.exact)
                        ? 'bg-white text-[#1A3263] font-medium'
                        : 'text-[#1A3263] hover:bg-white/10 hover:text-[#1A3263] font-medium'
                    }`}
                  >
                    <Icon size={18} className={isActive(item.path, item.exact) ? 'text-[#1A3263]' : 'text-gray-300'} />
                    <span className={`font-bold ${isActive(item.path, item.exact) ? 'text-[#1A3263]' : 'text-gray-300'}`}>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        
        {/* Settings at bottom */}
        <div className="flex-shrink border-t border-white/20 ">
          <Link
            to={addRoleParam(settingsItem.path)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive(settingsItem.path)
                ? 'bg-white text-[#1A3263] font-medium'
                : 'text-[#1A3263] hover:bg-white/10 hover:text-[#1A3263] font-medium'
            }`}
          >
            <settingsItem.icon size={18} className={isActive(settingsItem.path) ? 'text-[#1A3263]' : 'text-gray-300'} />
            <span className={`font-bold ${isActive(settingsItem.path) ? 'text-[#1A3263]' : 'text-gray-300'}`}>{settingsItem.label}</span>
          </Link>
        </div>
      </nav>
    </aside>
    </>
  )
}

export default DashboardSidebar