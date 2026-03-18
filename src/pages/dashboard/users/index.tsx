import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaUsers, FaUserShield, FaUserCheck, FaUserTimes, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaFilePdf, FaFileWord, FaPrint, FaBan } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AddUserModal } from '../../../components/modals'
import DeleteUserModal from '../../../components/modals/DeleteUserModal'
import SuspendModal from '../../../components/modals/SuspendModal'
import EditUserModal from '../../../components/modals/EditUserModal'
import ExportReportModal from '../../../components/modals/ExportReportModal'
import { checkPermissions } from '../../../utils/helper'
import { useAuth } from '../../../hooks/useAuth'
import { UserCreateRequest, UserUpdateRequest } from '../../../api/user'
import { activate, CreateUser, GetAllUser, UpdateUser } from '../../../hooks/useUser'

function Users() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userToDelete, setUserToDelete] = useState<{ userId: string; name: string } | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const createUser = CreateUser();
  const updateUser = UpdateUser();
  const activateUser = activate();

  // Fetching user data
  const { data: users, isLoading } = GetAllUser();
  const usersResults = users?.result

  // Get current role parameter
  const currentRole = searchParams.get('role') || 'owner'

  const handleAddUser = async (userInputs: UserCreateRequest) => {
    try {
      const response = await createUser.mutateAsync(userInputs);
      console.log('User created is:', response);
      setShowAddUserModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  // Function to activate User
  const handleActivateUser = async (userId: string) => {
    try {
      const result = await activateUser.mutateAsync(userId);
      console.log('User activated', result);
    } catch (error) {
      console.error('Error activating user:', error);
    }
  }

  const handleEditUser = async (userData:UserUpdateRequest) => {
    console.log('Updating user:', userData)
    try {
      const UpdateData = await updateUser.mutateAsync({ id: selectedUser.id, ...userData })
      console.log('User updated:', UpdateData);
      setShowEditModal(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleSuspendUser = (reason: string) => {
    console.log('Suspending user:', selectedUser?.fullName, 'Reason:', reason)
    setShowSuspendModal(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (user: { userId: string; name: string }) => {
    setUserToDelete(user)
    setShowDeleteUserModal(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
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

  // Calculate real stats from user data
  const totalUsers = usersResults?.length || 0
  const activeUsers = usersResults?.filter((user: any) => user.status === 'active').length || 0
  const pendingUsers = usersResults?.filter((user: any) => user.status === 'pending').length || 0
  const inactiveUsers = usersResults?.filter((user: any) => user.status === 'inactive').length || 0

  const stats = [
    { title: 'Total Users', value: totalUsers.toString(), icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Active Users', value: activeUsers.toString(), icon: FaUserCheck, color: 'bg-green-500' },
    { title: 'Pending Users', value: pendingUsers.toString(), icon: FaUserShield, color: 'bg-yellow-500' },
    { title: 'Inactive Users', value: inactiveUsers.toString(), icon: FaUserTimes, color: 'bg-red-500' }
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
      {/* Header - Fixed */}
      <div className='flex-shrink-0'>
        <h1 className="!text-2xl py-1 font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600">Manage system users and their information</p>
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

        {/* Users Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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

              {currentUser && checkPermissions(currentUser, 'user:create') && (
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90 flex items-center gap-2"
                >
                  <FaPlus size={14} />
                  Add New User
                </button>
              )}
            </div>

            {/* Users Table */}
            {isLoading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className='bg-[#1A3263]'>
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-white">User</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersResults && usersResults.length > 0 ? (
                      usersResults.map((user: any) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium">
                                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.fullName}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{user.phoneNumber}</td>
                          <td className="py-4 px-4 text-gray-700">{user.category || 'N/A'}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                              user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-2 text-blue-600 hover:text-blue-900"
                                onClick={() => navigate(`/dashboard/users/${user.id}?role=${currentRole}`)}
                                title="View Details"
                              >
                                <FaEye size={18} />
                              </button>
                              {currentUser && checkPermissions(currentUser, 'user:update') && (
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
                                <button
                                  className="p-2 text-gray-600 hover:text-gray-900"
                                  onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                                  title="More Actions"
                                >
                                  <HiDotsVertical size={18} />
                                </button>
                                {openDropdownId === user.id && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    {/* Button to active */}
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                      onClick={() => {
                                        handleActivateUser(user.id)
                                        setOpenDropdownId(null)
                                      }}
                                    >
                                        <FaUserCheck size={14} className="text-green-600" />
                                        Activate
                                      </button>
                                    <button
                                      onClick={() => {
                                        setSelectedUser(user)
                                        setShowSuspendModal(true)
                                        setOpenDropdownId(null)
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                      <FaBan size={14} className="text-orange-600" />
                                      Suspend
                                    </button>
                                    {currentUser && checkPermissions(currentUser, 'user:delete') && (
                                      <button
                                        onClick={() => {
                                          handleDeleteUser({ userId: user.id, name: user.fullName })
                                          setOpenDropdownId(null)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 border-t border-gray-200"
                                      >
                                        <FaTrash size={14} className="text-red-600" />
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
        fullName={selectedUser?.fullName || ''}
        userId={selectedUser?.id || ''}
      />

      <DeleteUserModal
        isOpen={showDeleteUserModal}
        onClose={() => {
          setShowDeleteUserModal(false)
          setUserToDelete(null)
        }}
        onConfirm={confirmDeleteUser}
        fullName={userToDelete?.name || ''}
        userId={userToDelete?.userId || ''}
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