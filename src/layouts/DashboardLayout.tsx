import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/ui/dashboardHeader'
import DashboardSidebar from '../components/ui/dashboardSidebar'

function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout