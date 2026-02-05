import { FaUsers, FaCalendarCheck, FaChartLine, FaClock, FaUserCheck, FaEye, FaCalendarAlt, FaBell } from 'react-icons/fa'

function CustomerDashboard() {
  const stats = [
    { title: 'Total Visitors', value: '1,234', icon: FaUsers, color: 'bg-blue-500', change: '+12%' },
    { title: 'Today\'s Check-ins', value: '89', icon: FaCalendarCheck, color: 'bg-green-500', change: '+8%' },
    { title: 'Active Sessions', value: '45', icon: FaClock, color: 'bg-yellow-500', change: '+15%' },
    { title: 'Pending Approvals', value: '12', icon: FaUserCheck, color: 'bg-purple-500', change: '-5%' }
  ]

  const recentVisitors = [
    { id: 1, name: 'John Smith', company: 'TechCorp', purpose: 'Business Meeting', time: '09:30 AM', status: 'Checked In', host: 'Sarah Johnson' },
    { id: 2, name: 'Alice Brown', company: 'StartupHub', purpose: 'Interview', time: '10:15 AM', status: 'Waiting', host: 'Mike Davis' },
    { id: 3, name: 'Bob Wilson', company: 'Global Inc', purpose: 'Consultation', time: '11:00 AM', status: 'Approved', host: 'Emma Wilson' },
    { id: 4, name: 'Carol Davis', company: 'Innovation Labs', purpose: 'Partnership', time: '02:30 PM', status: 'Checked Out', host: 'James Miller' }
  ]

  const upcomingAppointments = [
    { id: 1, visitor: 'David Johnson', time: '03:00 PM', purpose: 'Product Demo', host: 'Sarah Johnson' },
    { id: 2, visitor: 'Lisa Anderson', time: '04:30 PM', purpose: 'Contract Review', host: 'Mike Davis' },
    { id: 3, visitor: 'Tom Wilson', time: '05:15 PM', purpose: 'Technical Discussion', host: 'Emma Wilson' }
  ]

  const alerts = [
    { id: 1, message: 'Visitor John Smith has been waiting for 15 minutes', type: 'warning', time: '5 min ago' },
    { id: 2, message: 'Meeting room A is now available', type: 'info', time: '10 min ago' },
    { id: 3, message: 'Security alert: Unauthorized access attempt', type: 'danger', time: '20 min ago' }
  ]

  return (
    <div className="flex flex-col h-full">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="!text-4xl py-1 font-bold text-gray-900">Visitor Management Dashboard</h1>
        <p className="text-gray-600">Monitor and manage your company's visitor activities</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaBell className="text-orange-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Live Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${
                alert.type === 'danger' ? 'bg-red-50 border-red-500' : 
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' : 
                'bg-blue-50 border-blue-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  alert.type === 'danger' ? 'bg-red-500' : 
                  alert.type === 'warning' ? 'bg-yellow-500' : 
                  'bg-blue-500'
                }`}></div>
                <span className="text-sm text-gray-700 flex-1">{alert.message}</span>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Visitors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Visitors</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-3">
              {recentVisitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{visitor.name}</p>
                    <p className="text-sm text-gray-500">{visitor.company} • {visitor.purpose}</p>
                    <p className="text-xs text-gray-400">Host: {visitor.host}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{visitor.time}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      visitor.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                      visitor.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                      visitor.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {visitor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View Calendar</button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaCalendarAlt className="text-blue-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{appointment.visitor}</p>
                    <p className="text-sm text-gray-500">{appointment.purpose}</p>
                    <p className="text-xs text-gray-400">Host: {appointment.host}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <FaUsers className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Check In Visitor</p>
                <p className="text-sm text-gray-500">Register new visitor</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <FaCalendarCheck className="text-green-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Schedule Meeting</p>
                <p className="text-sm text-gray-500">Book appointment</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <FaEye className="text-purple-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">Scanning</p>
                <p className="text-sm text-gray-500">View real-time activity</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <FaChartLine className="text-orange-600" size={20} />
              <div className="text-left">
                <p className="font-medium text-gray-900">View Reports</p>
                <p className="text-sm text-gray-500">Analytics & insights</p>
              </div>
            </button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">89</p>
              <p className="text-sm text-gray-600">Total Check-ins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">76</p>
              <p className="text-sm text-gray-600">Completed Visits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">15</p>
              <p className="text-sm text-gray-600">Scheduled Meetings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard