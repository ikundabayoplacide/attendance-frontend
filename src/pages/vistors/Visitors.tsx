import { useState } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaUsers, FaUserCheck, FaUserClock, FaUserTimes, FaPlus, FaSearch, FaEdit, FaEye } from 'react-icons/fa'
import AddVisitorModal from '../../components/modals/AddVisitorModal'

function Visitors() {
  // const navigate = useNavigate()
  // const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('today')
  const [showAddVisitorModal, setShowAddVisitorModal] = useState(false)

  const handleAddVisitor = (visitorData: any) => {
    console.log('Adding visitor:', visitorData)
    // Add visitor logic here
    setShowAddVisitorModal(false)
  }

  // Get current role parameter
  // const currentRole = searchParams.get('role') || 'customer'

  const stats = [
    { title: 'Total Visitors Today', value: '24', icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Checked In', value: '18', icon: FaUserCheck, color: 'bg-green-500' },
    { title: 'Pending', value: '4', icon: FaUserClock, color: 'bg-yellow-500' },
    { title: 'Checked Out', value: '2', icon: FaUserTimes, color: 'bg-gray-500' }
  ]

  const visitors = [
    {
      id: 1,
      name: 'John Smith',
      company: 'TechCorp Inc.',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@techcorp.com',
      purpose: 'Business Meeting',
      host: 'Sarah Johnson',
      department: 'Sales',
      checkIn: '09:30',
      checkOut: null,
      date: '2024-01-15',
      status: 'Checked In',
      badge: 'V001'
    },
    {
      id: 2,
      name: 'Alice Brown',
      company: 'Design Studio',
      phone: '+1 (555) 987-6543',
      email: 'alice@designstudio.com',
      purpose: 'Interview',
      host: 'Mike Davis',
      department: 'HR',
      checkIn: '10:15',
      checkOut: null,
      date: '2024-01-15',
      status: 'Checked In',
      badge: 'V002'
    },
    {
      id: 3,
      name: 'Robert Wilson',
      company: 'Consulting Group',
      phone: '+1 (555) 456-7890',
      email: 'robert@consulting.com',
      purpose: 'Consultation',
      host: 'Emily Chen',
      department: 'Operations',
      checkIn: '08:45',
      checkOut: '11:30',
      date: '2024-01-15',
      status: 'Checked Out',
      badge: 'V003'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      company: 'Marketing Pro',
      phone: '+1 (555) 321-0987',
      email: 'maria@marketingpro.com',
      purpose: 'Delivery',
      host: 'Tom Anderson',
      department: 'Reception',
      checkIn: null,
      checkOut: null,
      date: '2024-01-15',
      status: 'Pending',
      badge: 'V004'
    }
  ]

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.host.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || visitor.status.toLowerCase().replace(' ', '_') === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Checked In': return 'bg-green-100 text-green-800'
      case 'Checked Out': return 'bg-gray-100 text-gray-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
      <div className="flex-shrink-0 mb-6">
        <h1 className="!text-3xl font-bold text-gray-900">Visitor Management</h1>
        <p className="text-gray-600">Manage and track all visitors in real-time</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
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
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Visitor Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search visitors, companies, or hosts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="checked_in">Checked In</option>
                <option value="checked_out">Checked Out</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button 
                onClick={() => setShowAddVisitorModal(true)}
                className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90 flex items-center gap-2"
              >
                <FaPlus size={14} />
                Add Visitor
              </button>
            </div>
          </div>

          {/* Visitors Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Visitor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Purpose</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Host</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Check In</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Check Out</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Badge</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{visitor.name}</p>
                        <p className="text-sm text-gray-500">{visitor.email}</p>
                        <p className="text-sm text-gray-500">{visitor.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{visitor.company}</td>
                    <td className="py-4 px-4 text-gray-700">{visitor.purpose}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{visitor.host}</p>
                        <p className="text-sm text-gray-500">{visitor.department}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{visitor.checkIn || '-'}</td>
                    <td className="py-4 px-4 text-gray-700">{visitor.checkOut || '-'}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                        {visitor.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {visitor.badge}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600" title="View Details">
                          <FaEye size={14} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600" title="Edit">
                          <FaEdit size={14} />
                        </button>
                        {visitor.status === 'Checked In' && (
                          <button className="p-2 text-gray-400 hover:text-red-600" title="Check Out">
                            <FaUserTimes size={14} />
                          </button>
                        )}
                        {visitor.status === 'Pending' && (
                          <button className="p-2 text-gray-400 hover:text-green-600" title="Check In">
                            <FaUserCheck size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredVisitors.length === 0 && (
            <div className="p-8 text-center">
              <FaUsers className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visitors found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Visitor Modal */}
      <AddVisitorModal
        isOpen={showAddVisitorModal}
        onClose={() => setShowAddVisitorModal(false)}
        onSubmit={handleAddVisitor}
      />
    </div>
  )
}

export default Visitors