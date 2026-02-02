import { useState } from 'react'

interface FormField {
  id: string
  label: string
  type: 'text' | 'number' | 'date' | 'select'
  options?: string[]
}

const availableFields: FormField[] = [
  { id: 'visitor-name', label: 'Visitor Name', type: 'text' },
  { id: 'company-name', label: 'Company Name', type: 'text' },
  { id: 'visit-date', label: 'Visit Date', type: 'date' },
  { id: 'visit-purpose', label: 'Visit Purpose', type: 'select', options: ['Meeting', 'Interview', 'Delivery', 'Maintenance'] },
  { id: 'visitor-count', label: 'Number of Visitors', type: 'number' },
  { id: 'host-name', label: 'Host Name', type: 'text' },
  { id: 'department', label: 'Department', type: 'select', options: ['HR', 'IT', 'Finance', 'Operations'] },
  { id: 'duration', label: 'Visit Duration (hours)', type: 'number' },
  { id: 'contact-number', label: 'Contact Number', type: 'text' },
  { id: 'email', label: 'Email Address', type: 'text' }
]

function ReportPage() {
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [generatedForm, setGeneratedForm] = useState<FormField[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    )
  }

  const handleGenerate = () => {
    const fields = availableFields.filter(field => selectedFields.includes(field.id))
    setGeneratedForm(fields)
    setFormData({})
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmitReport = () => {
    console.log('Report Data:', formData)
    alert('Report submitted successfully!')
  }

  return (
    <div className="flex-shrink-0 p-6">
      <h1 className="!text-2xl font-bold text-black mb-6">Custom Report Builder</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Report Fields</h2>
          
          <div className="space-y-3 mb-6">
            {availableFields.map((field) => (
              <label key={field.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.id)}
                  onChange={() => handleFieldToggle(field.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="font-medium text-gray-900">{field.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={selectedFields.length === 0}
            className="bg-[#1A3263] text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Generate Report Form
          </button>
        </div>

        {/* Generated Form */}
        {generatedForm.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Custom Report Form</h2>
            
            <div className="space-y-4 mb-6">
              {generatedForm.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={field.type === 'date' ? { colorScheme: 'light' } : {}}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitReport}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportPage