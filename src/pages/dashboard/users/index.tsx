import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaUsers, FaUserShield, FaUserCheck, FaUserTimes, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff, FaFilePdf, FaFileWord, FaPrint, FaBan } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AddUserModal, AddRoleModal } from '../../../components/modals'
import DeleteUserModal from '../../../components/modals/DeleteUserModal'
import SuspendModal from '../../../components/modals/SuspendModal'
import EditUserModal from '../../../components/modals/EditUserModal'
import ExportReportModal from '../../../components/modals/ExportReportModal'

function Users() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  // Get current role parameter
  const currentRole = searchParams.get('role') || 'owner'

  const handleAddUser = (userData: any) => {
    console.log('Adding user:', userData)
    // Add user logic here
  }

  const handleEditUser = (userData: any) => {
    console.log('Updating user:', userData)
    setShowEditModal(false)
    setSelectedUser(null)
  }

  const handleSuspendUser = (reason: string) => {
    console.log('Suspending user:', selectedUser?.name, 'Reason:', reason)
    setShowSuspendModal(false)
    setSelectedUser(null)
  }

  const handleAddRole = (roleData: any) => {
    console.log('Adding role:', roleData)
    // Add role logic here
  }

  const handleDeleteUser = (user: { id: number; name: string }) => {
    setUserToDelete(user)
    setShowDeleteUserModal(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      console.log('Deleting user:', userToDelete)
      // Add delete user logic here
      setShowDeleteUserModal(false)
      setUserToDelete(null)
    }
  }

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
    { id: 'status', label: 'Status' },
    { id: 'lastLogin', label: 'Last Login' },
  ]

  const stats = [
    { title: 'Total Users', value: '156', icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Active Users', value: '142', icon: FaUserCheck, color: 'bg-green-500' },
    { title: 'Admin Users', value: '8', icon: FaUserShield, color: 'bg-purple-500' },
    { title: 'Inactive Users', value: '14', icon: FaUserTimes, color: 'bg-red-500' }
  ]

  const users = [
    {
      id: 1,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
      lastLogin: '2024-01-15 09:30'
    },
    {
      id: 2,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Manager',
      department: 'HR',
      status: 'Active',
      lastLogin: '2024-01-15 08:45'
    },
    {
      id: 3,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'User',
      department: 'Finance',
      status: 'Inactive',
      lastLogin: '2024-01-10 16:20'
    }
  ]

  const roles = [
    { id: 1, name: 'Super Admin', users: 2, description: 'Full system access' },
    { id: 2, name: 'Admin', users: 6, description: 'Administrative privileges' },
    { id: 3, name: 'Manager', users: 24, description: 'Department management' },
    { id: 4, name: 'User', users: 124, description: 'Basic user access' }
  ]

  const permissions = [
    'View Dashboard',
    'Manage Users',
    'Manage Visitors',
    'View Reports',
    'System Settings',
    'Security Alerts',
    'Export Data',
    'Audit Logs'
  ]

  const rolePermissions: Record<string, boolean[]> = {
    'Super Admin': [true, true, true, true, true, true, true, true],
    'Admin': [true, true, true, true, false, true, true, false],
    'Manager': [true, false, true, true, false, false, true, false],
    'User': [true, false, false, false, false, false, false, false]
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
      <div className='flex-shrink-0'>
        <h1 className="!text-3xl py-1 font-bold text-gray-900">Users & Roles</h1>
        <p className="text-gray-600">Manage system users, roles, and permissions</p>
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
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                  ? 'border-[#1A3263] text-[#1A3263]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Users Management
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'roles'
                  ? 'border-[#1A3263] text-[#1A3263]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Roles & Permissions
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="p-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
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
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <div className="flex items-center gap-2">
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

              <button
                onClick={() => setShowAddUserModal(true)}
                className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90 flex items-center gap-2"
              >
                <FaPlus size={14} />
                Add New User
              </button>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className='bg-[#1A3263]'>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-white">User</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{user.department}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{user.lastLogin}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 text-blue-600 hover:text-blue-900"
                            onClick={() => navigate(`/dashboard/users/${user.id}?role=${currentRole}`)}
                            title="View Details"
                          >
                            <FaEye size={18} />
                          </button>
                          <button 
                            className="p-2 text-green-600 hover:text-green-900"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowEditModal(true)
                            }}
                            title="Edit User"
                          >
                            <FaEdit size={18} />
                          </button>
                          <div className="relative">
                            <button 
                              className="p-2 text-gray-600 hover:text-gray-900"
                              onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                              title="More Actions"
                            >
                              <HiDotsVertical size={18} />
                            </button>
                            {openDropdownId === user.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <button
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setShowSuspendModal(true)
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <FaBan size={14} className="text-orange-600" />
                                  Suspend User
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteUser({ id: user.id, name: user.name })
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 border-t border-gray-200"
                                >
                                  <FaTrash size={14} className="text-red-600" />
                                  Delete User
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Role Management</h3>
              <button
                onClick={() => setShowAddRoleModal(true)}
                className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90 flex items-center gap-2"
              >
                <FaPlus size={14} />
                Add New Role
              </button>
            </div>

            {/* Roles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {roles.map((role) => (
                <div key={role.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{role.name}</h4>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEdit size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                  <p className="text-xs text-gray-500">{role.users} users assigned</p>
                </div>
              ))}
            </div>

            {/* Permissions Matrix */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Permissions Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-4 font-medium text-gray-700">Permission</th>
                      {roles.map((role) => (
                        <th key={role.id} className="text-center py-2 px-4 font-medium text-gray-700">
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission, permIndex) => (
                      <tr key={permIndex} className="border-t border-gray-200">
                        <td className="py-3 px-4 text-gray-700">{permission}</td>
                        {roles.map((role) => (
                          <td key={role.id} className="py-3 px-4 text-center">
                            {rolePermissions[role.name][permIndex] ? (
                              <FaToggleOn className="text-green-500 text-xl mx-auto cursor-pointer" />
                            ) : (
                              <FaToggleOff className="text-gray-300 text-xl mx-auto cursor-pointer" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSubmit={handleAddUser}
      />

      <AddRoleModal
        isOpen={showAddRoleModal}
        onClose={() => setShowAddRoleModal(false)}
        onSubmit={handleAddRole}
      />

      {selectedUser && (
        <EditUserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser(null)
          }}
          onSubmit={handleEditUser}
          user={selectedUser}
        />
      )}

      <SuspendModal
        isOpen={showSuspendModal}
        onClose={() => {
          setShowSuspendModal(false)
          setSelectedUser(null)
        }}
        onConfirm={handleSuspendUser}
        userName={selectedUser?.name || ''}
      />

      <DeleteUserModal
        isOpen={showDeleteUserModal}
        onClose={() => {
          setShowDeleteUserModal(false)
          setUserToDelete(null)
        }}
        onConfirm={confirmDeleteUser}
        userName={userToDelete?.name || ''}
      />

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleGenerateReport}
        fields={exportFields}
        exportFormat={exportFormat}
        title="Export Users Report"
      />
    </div>
  )
}

export default Users