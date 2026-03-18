import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaSearch } from 'react-icons/fa'
import { useRole, useUpdateRole } from '../../../../hooks/useRole'
import { toast } from 'react-toastify'
import { usePermissionsList } from '../../../../hooks/usePermissions'

function EditRole() {
  const navigate = useNavigate()
  const { roleId } = useParams<{ roleId: string }>()
  const { data: permissionsData, isLoading: permissionsLoading } = usePermissionsList()
  const { data: roleData, isLoading: roleLoading, error: roleError } = useRole(roleId || '', !!roleId)
  const updateRole = useUpdateRole(roleId || '')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [initialPermissions, setInitialPermissions] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (roleData?.result?.permissions) {
      const permissionIds = roleData.result.permissions.map(p => p.id)
      setSelectedPermissions(permissionIds)
      setInitialPermissions(permissionIds)
    }
  }, [roleData])

  const permissions = permissionsData?.result || []
  const role = roleData?.result

  // Calculate changes
  const addedCount = selectedPermissions.filter(id => !initialPermissions.includes(id)).length
  const removedCount = initialPermissions.filter(id => !selectedPermissions.includes(id)).length
  const hasChanges = addedCount > 0 || removedCount > 0

  const filteredPermissions = permissions.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const handleSave = async () => {
    try {
      const response = await updateRole.mutateAsync({ permissionIds: selectedPermissions })
      
      if (response?.result?.permissions) {
        const savedCount = response.result.permissions.length
        if (savedCount !== selectedPermissions.length) {
          toast.error(`Warning: Expected ${selectedPermissions.length} permissions but got ${savedCount}`)
          return
        }
      }
      
      navigate('/dashboard/settings')
    } catch (error) {
      console.error('Error saving permissions:', error)
    }
  }


  if (permissionsLoading || roleLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  if (roleError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-red-600">Error loading role data</p>
        <button
          onClick={() => navigate('/dashboard/settings')}
          className="flex items-center gap-2 bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90"
        >
          <FaArrowLeft size={14} />
          Back to Settings
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
          >
            <FaArrowLeft size={14} />
            Back
          </button>
          <p className="text-gray-600 flex gap-2 mt-1 ">Configure permissions for<p className='font-bold font-capitalize text-[#1A3263] text-lg'>{role?.name || 'Role'}</p></p>
        </div>
        <div className='flex gap-1'>
        <button
          onClick={handleSave}
          disabled={updateRole.isPending || !hasChanges}
          className="flex items-center gap-2 bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-[#1A3263]/90 disabled:opacity-50 relative"
        >
          <FaSave size={14} />
          {updateRole.isPending ? 'Saving...' : 'Save Changes'}
          {hasChanges && (
            <span className="flex items-center gap-1 ml-1">
              {addedCount > 0 && (
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  +{addedCount}
                </span>
              )}
              {removedCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  -{removedCount}
                </span>
              )}
            </span>
          )}
        </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {filteredPermissions.map(permission => (
            <label key={permission.id} className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => togglePermission(permission.id)}
                className="w-4 h-4 text-[#1A3263] border-gray-300 rounded mt-1 bg-white"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{permission.name}</div>
                {permission.description && (
                  <div className="text-xs text-gray-600 mt-1">{permission.description}</div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    
    </div>
  
  )
}

export default EditRole
