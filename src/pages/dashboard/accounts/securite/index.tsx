import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaUsers, FaUserShield, FaUserCheck, FaUserTimes, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaFilePdf, FaFileWord, FaPrint, FaBan } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AddUserModal } from '../../../../components/modals'
import DeleteUserModal from '../../../../components/modals/DeleteUserModal'
import SuspendModal from '../../../../components/modals/SuspendModal'
import EditUserModal from '../../../../components/modals/EditUserModal'
import ExportReportModal from '../../../../components/modals/ExportReportModal'
import { UserCreateRequest, UserUpdateRequest } from '../../../../api/user'
import { checkPermissions } from '../../../../utils/helper'
import { useAuth } from '../../../../hooks/useAuth'

function SecuriteUsers() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userToDelete, setUserToDelete] = useState<{ userId: number; name: string } | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  // Get current role parameter
  const currentRole = searchParams.get('role') || 'owner'

  const handleAddUser = async (userData: Partial<UserCreateRequest>) => {
    console.log('Adding securite user:', userData)
  }

  const handleEditUser = async (userData: UserUpdateRequest) => {
    console.log('Updating securite user:', userData)
    setShowEditModal(false)
    setSelectedUser(null)
  }

  const handleSuspendUser = (reason: string) => {
    console.log('Suspending securite user:', selectedUser?.name, 'Reason:', reason)
    setShowSuspendModal(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (user: { userId: number; name: string }) => {
    setUserToDelete(user)
    setShowDeleteUserModal(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      console.log('Deleting securite user:', userToDelete)
      setShowDeleteUserModal(false)
      setUserToDelete(null)
    }
  }

  const handleExport = (type: 'pdf' | 'word' | 'print') => {
    setExportFormat(type)
    setShowExportModal(true)
  }

  const handleGenerateReport = (selectedFields: string[], startDate: string, endDate: string, format: 'pdf' | 'word' | 'print') => {
    console.log('Generating securite users report:', { selectedFields, startDate, endDate, format })
  }

  const exportFields = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'department', label: 'Department' },
    { id: 'status', label: 'Status' },
    { id: 'lastLogin', label: 'Last Login' },
  ]

  // Mock securite users data
  const securiteUsers = [
    {
      id: 1,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'Jean Baptiste Uwimana',
      email: 'jean.baptiste@company.com',
      role: 'Security Officer',
      department: 'Security',
      status: 'securite',
      lastLogin: '2024-01-15 09:30'
    },
    {
      id: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      name: 'Marie Claire Mukamana',
      email: 'marie.claire@company.com',
      role: 'Security Supervisor',
      department: 'Security',
      status: 'securite',
      lastLogin: '2024-01-15 08:45'
    },
    {
      id: 3,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'Paul Kagame Nkurunziza',
      email: 'paul.kagame@company.com',
      role: 'Security Guard',
      department: 'Security',
      status: 'securite',
      lastLogin: '2024-01-10 16:20'
    }
  ]

  const stats = [
    { title: 'Total Securite Users', value: securiteUsers.length.toString(), icon: FaUserShield, color: 'bg-blue-500' },
    { title: 'Active Securite', value: securiteUsers.filter(u => u.lastLogin > '2024-01-10').length.toString(), icon: FaUserCheck, color: 'bg-green-500' },
    { title: 'Security Officers', value: securiteUsers.filter(u => u.role === 'Security Officer').length.toString(), icon: FaUsers, color: 'bg-purple-500' },
    { title: 'Security Guards', value: securiteUsers.filter(u => u.role === 'Security Guard').length.toString(), icon: FaUserTimes, color: 'bg-orange-500' }
  ]

  const filteredUsers = securiteUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSearch && matchesRole
  })

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
        <h1 className="!text-3xl py-1 font-bold text-gray-900">Securite Users</h1>
        <p className="text-gray-600">Manage security personnel with securite status</p>
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

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search securite users..."
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
                <option value="officer">Security Officer</option>
                <option value="supervisor">Security Supervisor</option>
                <option value="guard">Security Guard</option>
                <option value="coordinator">Security Coordinator</option>
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

              {currentUser && checkPermissions(currentUser, 'security_gate:create') && (
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90 flex items-center gap-2"
                >
                  <FaPlus size={14} />
                  Add Securite User
                </button>
              )}
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
                  {filteredUsers.map((user) => (
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
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{user.department}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Securite
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{user.lastLogin}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                       {currentUser && checkPermissions(currentUser, 'security_gate:read')&&(   <button
                            className="p-2 text-blue-600 hover:text-blue-900"
                            onClick={() => navigate(`/dashboard/users/${user.id}?role=${currentRole}`)}
                            title="View Details"
                          >
                            <FaEye size={18} />
                          </button>
                       )}
                          {currentUser && checkPermissions(currentUser, 'security_gate:update') && (
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
                          )}
                          <div className="relative">
                           {currentUser && checkPermissions(currentUser, 'security_gate:delete') && (<button
                              className="p-2 text-gray-600 hover:text-gray-900"
                              onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                              title="More Actions"
                            >
                              <HiDotsVertical size={18} />
                            </button>
                           )}
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
                                {currentUser && checkPermissions(currentUser, 'user:delete') && (
                                  <button
                                    onClick={() => {
                                      handleDeleteUser({ userId: user.id, name: user.name })
                                      setOpenDropdownId(null)
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 border-t border-gray-200"
                                  >
                                    <FaTrash size={14} className="text-red-600" />
                                    Delete User
                                  </button>
                                )}
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

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <FaUserShield className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No securite users found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || roleFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No securite users have been added yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSubmit={handleAddUser}
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
        fullName={selectedUser?.name || ''}
        userId={selectedUser?.id?.toString() || ''}
      />

      <DeleteUserModal
        isOpen={showDeleteUserModal}
        onClose={() => {
          setShowDeleteUserModal(false)
          setUserToDelete(null)
        }}
        onConfirm={confirmDeleteUser}
        fullName={userToDelete?.name || ''}
        userId={userToDelete?.userId?.toString() || ''}
      />

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleGenerateReport}
        fields={exportFields}
        exportFormat={exportFormat}
        title="Export Securite Users Report"
      />
    </div>
  )
}

export default SecuriteUsers