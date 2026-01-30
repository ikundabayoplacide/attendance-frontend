import { FaHome, FaUsers, FaCalendarCheck, FaChartBar, FaCog, FaUserCheck, FaEye, FaExclamationTriangle, FaCalendarAlt, FaBell, FaServer } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

function DashboardSidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard Overview', exact: true },
    { path: '/dashboard/live-monitoring', icon: FaEye, label: 'Live Monitoring' },
    { path: '/dashboard/visitors', icon: FaUsers, label: 'Visitor Management' },
    { path: '/dashboard/hosts', icon: FaUserCheck, label: 'Host Management' },
    { path: '/dashboard/users', icon: FaUsers, label: 'User & Roles' },
    { path: '/dashboard/approvals', icon: FaCalendarCheck, label: 'Visit Approvals' },
    { path: '/dashboard/appointments', icon: FaCalendarAlt, label: 'Appointments' },
    { path: '/dashboard/security', icon: FaExclamationTriangle, label: 'Security & Alerts' },
    { path: '/dashboard/reports', icon: FaChartBar, label: 'Reports & Analytics' },
    { path: '/dashboard/notifications', icon: FaBell, label: 'Notifications' },
    { path: '/dashboard/system-health', icon: FaServer, label: 'System Health' }
  ]

  const settingsItem = { path: '/dashboard/settings', icon: FaCog, label: 'Settings' }

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="w-64 bg-[#1A3263] text-white h-full flex flex-col">
      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <nav className="flex-1 px-4 pt-10 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-scroll min-h-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="space-y-2 pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
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
            to={settingsItem.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
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
  )
}

export default DashboardSidebar