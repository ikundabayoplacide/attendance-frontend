import { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaShieldAlt, FaTimes } from 'react-icons/fa'
import { UserUpdateRequest } from '../../api/user'

interface User {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  category: string
  department: string
  company: string
  status: string
}

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: UserUpdateRequest) => Promise<void>
  user: User
}

export default function EditUserModal({ isOpen, onClose, onSubmit, user }: EditUserModalProps) {
  const countries = [
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+91', flag: '🇮🇳', name: 'India' }
  ]

  const [formData, setFormData] = useState<User>({
    id: user?.id || 0,
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    category: user?.category || '',
    department: user?.department || '',
    company: user?.company || '',
    status: user?.status || ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Initialize country and phone number based on existing data
  const getCountryAndPhoneFromNumber = (phone: string) => {
    if (!phone) return { country: { code: '+250', flag: '🇷🇼', name: 'Rwanda' }, localNumber: '' }
    
    // Check if phone starts with + (display format) or just digits (database format)
    if (phone.startsWith('+')) {
      const country = countries.find(c => phone.startsWith(c.code))
      if (country) {
        const localNumber = phone.replace(country.code, '')
        return { country, localNumber }
      }
    } else {
      // Database format (e.g., "250789897235")
      const country = countries.find(c => phone.startsWith(c.code.replace('+', '')))
      if (country) {
        const localNumber = phone.replace(country.code.replace('+', ''), '')
        return { country, localNumber }
      }
    }
    return { country: { code: '+250', flag: '🇷🇼', name: 'Rwanda' }, localNumber: phone }
  }
  
  const { country: initialCountry, localNumber: initialLocalNumber } = getCountryAndPhoneFromNumber(user?.phoneNumber || '')
  const [selectedCountry, setSelectedCountry] = useState(initialCountry)
  const [localPhoneNumber, setLocalPhoneNumber] = useState(initialLocalNumber)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales']
  const categories = ['Employee', 'Visitor', 'Securite', 'Contractor', 'VIP']
  const statuses = ['active', 'inactive', 'pending']
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'phoneNumber') {
      setLocalPhoneNumber(value)
      // Combine country code with local number (remove + from country code for database storage)
      const fullPhoneNumber = selectedCountry.code.replace('+', '') + value
      setFormData(prev => ({ ...prev, phoneNumber: fullPhoneNumber }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Convert User to UserUpdateRequest format
    const updateData: UserUpdateRequest = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      category: formData.category,
      department: formData.department,
      company: formData.company,
      status: formData.status as 'active' | 'inactive' | 'pending' | 'rejected'
    }

    await onSubmit(updateData)
    handleClose()
  }

  const handleClose = () => {
    const { country: resetCountry, localNumber: resetLocalNumber } = getCountryAndPhoneFromNumber(user?.phoneNumber || '')
    setSelectedCountry(resetCountry)
    setLocalPhoneNumber(resetLocalNumber)
    setFormData({
      id: user?.id || 0,
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      category: user?.category || '',
      department: user?.department || '',
      company: user?.company || '',
      status: user?.status || ''
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaUser className="text-blue-600" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Edit User</h3>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaUser className="inline mr-2" size={14} />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaEnvelope className="inline mr-2" size={14} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaPhone className="inline mr-2" size={14} />
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <span className="text-sm">{selectedCountry.flag}</span>
                    <span className="text-gray-400 text-xs">▼</span>
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-48 max-h-48 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country)
                            setShowCountryDropdown(false)
                            // Update phone number with new country code
                            if (localPhoneNumber) {
                              const fullPhoneNumber = country.code.replace('+', '') + localPhoneNumber
                              setFormData(prev => ({ ...prev, phoneNumber: fullPhoneNumber }))
                            }
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 transition-colors text-left"
                        >
                          <span>{country.flag}</span>
                          <span className="text-gray-700">{country.name}</span>
                          <span className="text-gray-500 ml-auto">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-900 pointer-events-none">
                      {selectedCountry.code}
                    </span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={localPhoneNumber}
                      onChange={handleInputChange}
                      placeholder="XXX XXX XXX"
                      className={`w-full pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ paddingLeft: `${selectedCountry.code.length * 8 + 16}px` }}
                    />
                  </div>
                  {localPhoneNumber && (
                    <span className="text-green-500 text-lg">✓</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Full number: {selectedCountry.code.replace('+', '')}{localPhoneNumber}
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaBuilding className="inline mr-2" size={14} />
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter company name"
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaBuilding className="inline mr-2" size={14} />
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaShieldAlt className="inline mr-2" size={14} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border bg-gray-200  border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#1A3263] text-white rounded-lg hover:bg-blue-800"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}