import { useState } from 'react'
import { FaUsers, FaArrowRight, FaArrowDown, FaChartLine, FaEye, FaCalendarAlt, FaUserCheck, FaSync, FaSearch } from 'react-icons/fa'
import VisitorPieChart from '../../../../components/ui/VisitorPieChart'
import AttendModal from '../../../../components/modals/AttendModal'
import checkGif from '../../../../assets/images/click.gif'

function HelpDeskDashboard() {
  const [showAttendModal, setShowAttendModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin')
  const [searchTerm, setSearchTerm] = useState('')
  const stats = {
    total: 1234,
    checkIn: 89,
    checkOut: 45
  }

  const checkInVisitors = [
    { id: 1, name: 'John Smith', company: 'TechCorp', email: 'john@techcorp.com', phone: '+1 555-0101', purpose: 'Business Meeting', host: 'Sarah Johnson', department: 'Sales', time: '09:30 AM', badge: 'V001' },
    { id: 2, name: 'Alice Brown', company: 'StartupHub', email: 'alice@startuphub.com', phone: '+1 555-0102', purpose: 'Interview', host: 'Mike Davis', department: 'HR', time: '10:15 AM', badge: 'V002' },
    { id: 3, name: 'Bob Wilson', company: 'Global Inc', email: 'bob@global.com', phone: '+1 555-0103', purpose: 'Consultation', host: 'Emma Wilson', department: 'Operations', time: '11:00 AM', badge: 'V003' }
  ]

  const checkOutVisitors = [
    { id: 4, name: 'Carol Davis', company: 'Innovation Labs', email: 'carol@innovation.com', phone: '+1 555-0104', purpose: 'Partnership', host: 'James Miller', department: 'Business Dev', time: '02:30 PM', badge: 'V004' },
    { id: 5, name: 'David Lee', company: 'Tech Solutions', email: 'david@techsol.com', phone: '+1 555-0105', purpose: 'Delivery', host: 'Lisa Chen', department: 'Reception', time: '03:15 PM', badge: 'V005' },
    { id: 6, name: 'Eva Martinez', company: 'Design Co', email: 'eva@design.com', phone: '+1 555-0106', purpose: 'Meeting', host: 'Tom Anderson', department: 'Marketing', time: '04:00 PM', badge: 'V006' }
  ]

  const currentVisitors = activeTab === 'checkin' ? checkInVisitors : checkOutVisitors
  const filteredVisitors = currentVisitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.host.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      
      {/* Header - Fixed */}
      <div className='flex-shrink-0 flex items-center justify-between'>
        <div>
          <h1 className="!text-lg font-bold text-gray-900">Help Desk Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-[#1A3263] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" title="Refresh">
            <FaSync size={14} />
          </button>
        </div>
      </div>

      {/* Attend Button - Centered */}
      <div className="flex justify-center mt-[-30px] ">
        <button 
          onClick={() => setShowAttendModal(true)}
          className="px-4 sm:px-8 py-2 sm:py-3 cursor-pointer bg-[#1A3263] text-white rounded-lg hover:bg-[#1A3263]/90 transition-colors flex items-center gap-2 text-sm font-bold"
        >
          Attend
          <img src={checkGif} alt="Attend" className="w-12 h-8" />
        </button>
      </div>

      {/* Attend Modal */}
      <AttendModal isOpen={showAttendModal} onClose={() => setShowAttendModal(false)} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 mt-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-500 p-1 rounded-lg">
                <FaUsers className="text-white"  />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Checked In</p>
                <p className="text-lg font-bold text-green-600">{stats.checkIn}</p>
              </div>
              <div className="bg-green-500 p-1 rounded-lg">
                <FaArrowRight className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Checked Out</p>
                <p className="text-lg font-bold text-red-600">{stats.checkOut}</p>
              </div>
              <div className="bg-red-500 p-1 rounded-lg">
                <FaArrowDown className="text-white"  />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Chart (Left) and Quick Actions + Recent Activity (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Visitor Status Distribution</h2>
            <VisitorPieChart total={stats.total} checkIn={stats.checkIn} checkOut={stats.checkOut} />
          </div>

          {/* Right: Quick Actions and Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <FaCalendarAlt className="text-blue-600" size={18} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Appointments</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FaUserCheck className="text-green-600" size={18} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Hand over</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <FaEye className="text-purple-600" size={18} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Visitors</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <FaChartLine className="text-orange-600" size={18} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Reports</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {currentVisitors.slice(0, 3).map((visitor) => (
                  <div key={visitor.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 text-sm">{visitor.name}</p>
                    <p className="text-xs text-gray-500">{visitor.company}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-400">{visitor.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        activeTab === 'checkin' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {activeTab === 'checkin' ? 'Checked In' : 'Checked Out'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('checkin')}
                className={`pb-2 px-4 font-medium transition-colors ${
                  activeTab === 'checkin'
                    ? 'text-[#1A3263] border-b-2 border-[#1A3263]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Check In
              </button>
              <button
                onClick={() => setActiveTab('checkout')}
                className={`pb-2 px-4 font-medium transition-colors ${
                  activeTab === 'checkout'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Check Out
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search visitors, companies, or hosts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className='bg-[#1A3263]'>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Visitor</th>
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Purpose</th>
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Host</th>
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Badge</th>
                  <th className="text-left py-3 px-4 font-medium text-white whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{visitor.name}</p>
                        <p className="text-sm text-gray-500">{visitor.email}</p>
                        <p className="text-sm text-gray-500">{visitor.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{visitor.company}</td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{visitor.purpose}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{visitor.host}</p>
                        <p className="text-sm text-gray-500">{visitor.department}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{visitor.time}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {visitor.badge}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button className="p-2 text-gray-400 hover:text-blue-600" title="View Details">
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpDeskDashboard