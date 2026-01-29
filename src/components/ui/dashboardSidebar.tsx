import { FaHome, FaUsers, FaCalendarCheck, FaChartBar, FaCog, FaUserCheck } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

function DashboardSidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard', exact: true },
    { path: '/dashboard/visitors', icon: FaUsers, label: 'Visitors' },
    { path: '/dashboard/attendance', icon: FaCalendarCheck, label: 'Attendance' },
    { path: '/dashboard/users', icon: FaUserCheck, label: 'Users' },
    { path: '/dashboard/reports', icon: FaChartBar, label: 'Reports' }
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
     

      <nav className="flex-1 px-4 pt-10 flex flex-col">
        <ul className="space-y-2 flex-1">
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
        
        {/* Settings at bottom */}
        <div className="pb-4">
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