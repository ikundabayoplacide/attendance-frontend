import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaSearch, FaEdit, FaTrash, FaEye, FaUserCheck, FaFilePdf, FaFileWord, FaPrint } from 'react-icons/fa'
import ExportReportModal from '../../../../components/modals/ExportReportModal'

function ActiveUsers() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')

  const handleExport = (type: 'pdf' | 'word' | 'print') => {
    setExportFormat(type)
    setShowExportModal(true)
  }

  const handleGenerateReport = (selectedFields: string[], startDate: string, endDate: string, format: 'pdf' | 'word' | 'print') => {
    console.log('Generating report:', { selectedFields, startDate, endDate, format })
  }

  const exportFields = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'department', label: 'Department' },
    { id: 'lastLogin', label: 'Last Login' },
  ]

  const currentRole = searchParams.get('role') || 'owner'

  const activeUsers = [
    {
      id: 1,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      department: 'IT',
      lastLogin: '2024-01-15 09:30'
    },
    {
      id: 2,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Manager',
      department: 'HR',
      lastLogin: '2024-01-15 08:45'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FaUserCheck className="text-green-600" size={32} />
          <h1 className="!text-3xl font-bold text-gray-900">Active Users</h1>
        </div>
        <p className="text-gray-600">Manage all active users in the system</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search active users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              title="Export as PDF"
            >
              <FaFilePdf size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={() => handleExport('word')}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              title="Export as Word"
            >
              <FaFileWord size={16} />
              <span className="hidden sm:inline">Word</span>
            </button>
            <button
              onClick={() => handleExport('print')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              title="Print"
            >
              <FaPrint size={16} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className='bg-[#1A3263]'>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-white">User</th>
                <th className="text-left py-3 px-4 font-medium text-white">Role</th>
                <th className="text-left py-3 px-4 font-medium text-white">Department</th>
                <th className="text-left py-3 px-4 font-medium text-white">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{user.department}</td>
                  <td className="py-4 px-4 text-gray-700">{user.lastLogin}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600"
                        onClick={() => navigate(`/dashboard/users/${user.id}?role=${currentRole}`)}
                      >
                        <FaEye size={14} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600">
                        <FaEdit size={14} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleGenerateReport}
        fields={exportFields}
        exportFormat={exportFormat}
        title="Export Active Users Report"
      />
    </div>
  )
}

export default ActiveUsers
