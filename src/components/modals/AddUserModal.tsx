import { useState } from 'react'
import { FaPlus, FaUser, FaEnvelope, FaPhone, FaShieldAlt } from 'react-icons/fa'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: any) => void
}

function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
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

  const [formData, setFormData] = useState({
    fullName: '',
    category: '',
    password: 'Placide@100',
    phoneNumber: '',
    email: ''
  })

  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Default to Rwanda
  const [localPhoneNumber, setLocalPhoneNumber] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({ 
      fullName: '', 
      password: 'Placide@100', 
      phoneNumber: '', 
      category: '', 
      email: '' 
    })
    setLocalPhoneNumber('')
    setSelectedCountry(countries[0])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 border border-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2" size={14} />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="John Doe"
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2" size={14} />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="santech@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              required
            />
          </div>
          
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
                  className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
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
                    placeholder="789897235"
                    className="w-full pr-4 py-3 text-sm border rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent text-black bg-white border-gray-300"
                    style={{ paddingLeft: `${selectedCountry.code.length * 8 + 16}px` }}
                    required
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
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaShieldAlt className="inline mr-2" size={14} />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent appearance-none bg-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Employee">Employee</option>
              <option value="Visitor">Visitor</option>
              <option value="Securite">Securite</option>
              <option value="Contractor">Contractor</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#1A3263] text-white rounded-lg hover:bg-[#1A3263]/90 transition-colors font-medium"
            >
            <span className="flex items-center justify-center gap-2"><FaPlus size={16}/> Add User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal