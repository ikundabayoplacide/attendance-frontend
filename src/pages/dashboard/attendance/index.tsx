import { useState, useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaUsers, FaUserCheck, FaUserClock, FaUserTimes, FaSearch, FaEdit, FaEye, FaFilePdf, FaFileWord, FaPrint } from 'react-icons/fa'
import AddVisitorModal from '../../../components/modals/AddVisitorModal'
import ExportReportModal from '../../../components/modals/ExportReportModal'

function Attendance() {
  // const navigate = useNavigate()
  // const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddVisitorModal, setShowAddVisitorModal] = useState(false)
  const [filterType, setFilterType] = useState<'day' | 'time'>('day')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [shouldFilter, setShouldFilter] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')

  const departments = ['Sales', 'HR', 'Operations', 'Business Dev', 'Reception', 'Marketing']

  // Trigger filtering only when both start and end are selected
  useEffect(() => {
    if (startDateTime && endDateTime) {
      setShouldFilter(true)
    } else if (!startDateTime && !endDateTime) {
      setShouldFilter(false)
    }
  }, [startDateTime, endDateTime])

  const handleAddVisitor = (visitorData: any) => {
    console.log('Adding visitor:', visitorData)
    // Add visitor logic here
    setShowAddVisitorModal(false)
  }

  const handleExport = (type: 'pdf' | 'word' | 'print') => {
    setExportFormat(type)
    setShowExportModal(true)
  }

  const handleGenerateReport = (selectedFields: string[], startDate: string, endDate: string, format: 'pdf' | 'word' | 'print') => {
    console.log('Generating report:', { selectedFields, startDate, endDate, format })
  }

  const exportFields = [
    { id: 'name', label: 'Visitor Name' },
    { id: 'email', label: 'Email' },
    { id: 'company', label: 'Company' },
    { id: 'purpose', label: 'Purpose' },
    { id: 'host', label: 'Host' },
    { id: 'department', label: 'Department' },
    { id: 'checkIn', label: 'Check In Time' },
    { id: 'checkOut', label: 'Check Out Time' },
    { id: 'status', label: 'Status' },
    { id: 'badge', label: 'Badge ID' },
  ]

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
    const matchesDepartment = !filterDepartment || visitor.department === filterDepartment
    
    let matchesDateTime = true
    if (shouldFilter && startDateTime && endDateTime) {
      if (filterType === 'day') {
        matchesDateTime = visitor.date >= startDateTime && visitor.date <= endDateTime
      } else {
        matchesDateTime = !!visitor.checkIn && visitor.checkIn >= startDateTime && visitor.checkIn <= endDateTime
      }
    }
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesDateTime
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
          input[type="date"]::-webkit-calendar-picker-indicator,
          input[type="time"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            opacity: 1;
            filter: brightness(0) saturate(100%);
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
                    <Icon className="text-white" size={18} />
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
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'day' | 'time')}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              >
                <option value="day">Day</option>
                <option value="time">Time</option>
              </select>
              <input
                type={filterType === 'day' ? 'date' : 'time'}
                placeholder="Start"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              />
              <input
                type={filterType === 'day' ? 'date' : 'time'}
                placeholder="End"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                title="Export as PDF"
              >
                <FaFilePdf size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={() => handleExport('word')}
                className="flex items-center gap-2 px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                title="Export as Word"
              >
                <FaFileWord size={16} />
                <span className="hidden sm:inline">Word</span>
              </button>
              <button
                onClick={() => handleExport('print')}
                className="flex items-center gap-2 px-3 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
                title="Print"
              >
                <FaPrint size={16} />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Visitors Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className='bg-[#1A3263]'>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-white">Visitor</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Purpose</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Host</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Check In</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Check Out</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Badge</th>
                  <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
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

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleGenerateReport}
        fields={exportFields}
        exportFormat={exportFormat}
        title="Export Visitor Report"
      />
    </div>
  )
}

export default Attendance