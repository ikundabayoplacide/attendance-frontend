import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaSearch, FaEdit, FaTrash, FaEye, FaUserTimes, FaFilePdf, FaFileWord, FaPrint, FaUserCheck, FaBan } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import DeleteUserModal from '../../../../components/modals/DeleteUserModal'
import SuspendModal from '../../../../components/modals/SuspendModal'
import EditUserModal from '../../../../components/modals/EditUserModal'
import ExportReportModal from '../../../../components/modals/ExportReportModal'
import { checkPermissions } from '../../../../utils/helper'
import { useAuth } from '../../../../hooks/useAuth'
import {UserUpdateRequest } from '../../../../api/user'
import { useActivateUser, useGetUsers, useUpdateUser } from '../../../../hooks/useUser'
import { CgSpinner } from 'react-icons/cg'

function InactiveUsers() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userToDelete, setUserToDelete] = useState<{ userId: string; name: string } | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const updateUser = UpdateUser();
  const activateUser = activate();

  const handleActivateUser = async (userId: string) => {
    try {
      const result = await activateUser.mutateAsync(userId);
      console.log('User activated', result);
    } catch (error) {
      console.error('Error activating user:', error);
    }
  }

  const handleEditUser = async (userData: UserUpdateRequest) => {
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
    { id: 'lastLogin', label: 'Last Login' },
  ]

  const currentRole = searchParams.get('role') || 'owner'

  const { data: users, isLoading } = useGetUsers();
  const usersResults = users?.result
  const inactiveUsers = usersResults?.filter((user: any) => user.status === 'inactive') || [];

  return (
    <div className="p-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <div className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <FaUserTimes className="text-red-600" size={28} />
          <h1 className="!text-2xl font-bold text-gray-900">Inactive Users</h1>
        </div>
        <p className="text-gray-600">Manage all inactive users in the system</p>
      </div>
      <div className="flex-1 overflow-y-auto space-y-6 mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search inactive users..."
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

          <div className="overflow-hidden rounded-lg border border-gray-200">
            {isLoading ? (
              <div className="text-center py-8"><CgSpinner /></div>
            ) : (
              <table className="w-full">
                <thead className='bg-[#1A3263]'>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-white">User</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveUsers && inactiveUsers.length > 0 ? (
                    inactiveUsers.map((user: any) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                              <span className="text-red-600 font-medium">
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
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        No inactive users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
        </div>
        </div>
      </div>


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
        title="Export Inactive Users Report"
      />
    </div>
  )
}

export default InactiveUsers
