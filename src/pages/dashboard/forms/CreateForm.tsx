import { useState } from 'react'
import { FaPlus, FaTrash, FaUsers, FaClock, FaFileAlt, FaSave } from 'react-icons/fa'
import RoleSelectionModal from '../../../components/modals/RoleSelectionModal'

interface CustomField {
  id: string
  label: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'date'
  required: boolean
  options?: string[]
}

interface FormData {
  title: string
  description: string
  startTime: string
  endTime: string
  allowedRoles: string[]
  customFields: CustomField[]
}

function CreateForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    allowedRoles: [],
    customFields: []
  })

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [newFieldLabel, setNewFieldLabel] = useState('')
  const [newFieldType, setNewFieldType] = useState<CustomField['type']>('text')
  const [newFieldRequired, setNewFieldRequired] = useState(false)

  const roleNames: Record<string, string> = {
    admin: 'Administrator',
    manager: 'Manager',
    employee: 'Employee',
    visitor: 'Visitor',
    security: 'Security',
    receptionist: 'Receptionist',
    hr: 'HR Staff',
    it: 'IT Support'
  }

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      allowedRoles: prev.allowedRoles.includes(roleId)
        ? prev.allowedRoles.filter(id => id !== roleId)
        : [...prev.allowedRoles, roleId]
    }))
  }

  const addCustomField = () => {
    if (!newFieldLabel.trim()) return

    const newField: CustomField = {
      id: Date.now().toString(),
      label: newFieldLabel,
      type: newFieldType,
      required: newFieldRequired,
      options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined
    }

    setFormData(prev => ({
      ...prev,
      customFields: [...prev.customFields, newField]
    }))

    setNewFieldLabel('')
    setNewFieldType('text')
    setNewFieldRequired(false)
  }

  const removeCustomField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter(field => field.id !== fieldId)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form created:', formData)
    // Handle form creation logic here
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="!text-2xl font-bold text-gray-900">Form Builder</h1>
          <p className="text-gray-600">Create custom forms for your organization</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Form Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaFileAlt className="text-blue-600" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter form title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter form description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Time Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaClock className="text-green-600" />
            Time Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Allowed Roles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaUsers className="text-purple-600" />
            Access Control
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed Roles *
            </label>
            <div
              onClick={() => setShowRoleModal(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] flex items-center"
            >
              {formData.allowedRoles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.allowedRoles.map(roleId => (
                    <span key={roleId} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {roleNames[roleId]}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">Click to select allowed roles</span>
              )}
            </div>
          </div>
        </div>

        {/* Custom Fields */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Fields</h2>
          
          {/* Add New Field */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Field label"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as CustomField['type'])}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newFieldRequired}
                    onChange={(e) => setNewFieldRequired(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Required</span>
                </label>
              </div>
              <div>
                <button
                  type="button"
                  onClick={addCustomField}
                  className="w-full bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2"
                >
                  <FaPlus size={14} />
                  Add Field
                </button>
              </div>
            </div>
          </div>

          {/* Existing Custom Fields */}
          {formData.customFields.length > 0 && (
            <div className="space-y-3">
              {formData.customFields.map((field) => (
                <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{field.label}</div>
                    <div className="text-sm text-gray-500">
                      Type: {field.type} {field.required && '• Required'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCustomField(field.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#1A3263] text-white px-6 py-3 rounded-lg hover:bg-blue-800 flex items-center gap-2 font-medium"
          >
            <FaSave size={16} />
            Create Form
          </button>
        </div>
      </form>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        selectedRoles={formData.allowedRoles}
        onRoleToggle={handleRoleToggle}
      />
    </div>
  )
}

export default CreateForm