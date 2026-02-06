import { useState } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import DashboardHeader from '../components/ui/dashboardHeader'
import DashboardSidebar from '../components/ui/dashboardSidebar'
import borderImage from '../assets/images/design.png'

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchParams] = useSearchParams()
  
  // Get user role from URL parameters, default to owner
  const userRole = searchParams.get('role') === 'customer' ? 'customer' : 'owner'

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          userRole={userRole}
        />
        
        {/* Content with border design */}
        <main 
          className="flex-1 overflow-y-auto p-6 relative"
          style={{
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderImage: `url(${borderImage}) 8 repeat`,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout