import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { usersApi } from '../../api/user'
import type { User } from '../../api/auth'
import { useCreateAppointment } from '../../hooks/useAppointment'

interface ScheduleAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (appointmentData: any) => void
}

function ScheduleAppointmentModal({ isOpen, onClose, onSubmit }: ScheduleAppointmentModalProps) {
  const [formData, setFormData] = useState({
    userId:'',
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    company: '',
    purpose: '',
    host: '',
    department: '',
    appointmentDate: '',
    appointmentTime: '',
    timeDuration: '',
    appointmentLocation: '',
    note: ''
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const submitAppointmentData=useCreateAppointment();

  const handleSearch = async (queryOverride?: string) => {
    const query = (queryOverride ?? searchQuery).trim()
    if (!query) {
      setSearchResults([])
      setSelectedUser(null)
      setSearchError('Please enter a namesubmitAppointmentData, email, or phone to search.')
      return
    }

    if (query.length < 2) {
      setSearchResults([])
      setSelectedUser(null)
      setSearchError('Please enter at least 2 characters to narrow results.')
      return
    }

    try {
      setIsSearching(true)
      setSearchError('')
      const response = await usersApi.getAll({ search: query, limit: 50 })
      if (response.success) {
        const filtered = (response.result || []).filter((user) => {
          const lowered = query.toLowerCase()
          return [user.fullName, user.email, user.phoneNumber]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(lowered))
        })

        if (filtered.length === 0) {
          setSearchResults([])
          setSearchError('No matching users found for this search term.')
        } else {
          setSearchResults(filtered.slice(0, 10))
        }
      } else {
        setSearchResults([])
        setSearchError(response.message || 'No users found')
      }
    } catch (error: any) {
      setSearchResults([])
      setSearchError(error?.message || 'Failed to search users')
    } finally {
      setIsSearching(false)
    }
  }

  const handleAutoFill = () => {
    if (!selectedUser) return

    setFormData(prev => ({
      ...prev,
      visitorName: selectedUser.fullName || prev.visitorName,
      visitorEmail: selectedUser.email || prev.visitorEmail,
      visitorPhone: selectedUser.phoneNumber || prev.visitorPhone,
      company: selectedUser.company || prev.company || '',
      department: selectedUser.department || prev.department || ''
    }))
  }

  const handleSelectResult = (user: User) => {
    setSelectedUser(user)
    setSearchQuery(`${user.fullName} (${user.email || user.phoneNumber || ''})`)
    setSearchResults([])
  }

  const clearUserSelection = () => {
    setSelectedUser(null)
    setSearchQuery('')
    setSearchResults([])
    setSearchError('')
    setFormData({
      userId:'',
      visitorName: '',
      visitorEmail: '',
      visitorPhone: '',
      company: '',
      purpose: '',
      host: '',
      department: '',
      appointmentDate: '',
      appointmentTime: '',
      timeDuration: '',
      appointmentLocation: '',
      note: ''
    })
    if (searchTimeout) {
      window.clearTimeout(searchTimeout)
      setSearchTimeout(null)
    }
  }

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        window.clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous messages
    setError('')
    setSuccess('')
    
    // Validate required user selection
    if (!selectedUser?.id) {
      setError('Please select a user before scheduling the appointment.')
      return
    }
    
    setIsSubmitting(true)
    
    // Prepare data for backend (exclude visitor info, add status)
    const appointmentData = {
      userId: selectedUser.id.toString(), // Now guaranteed to exist
      purpose: formData.purpose,
      host: formData.host,
      status: 'pending' as const,
      department: formData.department,
      company: formData.company,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      timeDuration: formData.timeDuration,
      appointmentLocation: formData.appointmentLocation,
      note: formData.note
    }
    
    try {
      await submitAppointmentData.mutateAsync(appointmentData);
      
      // Success - reset form and show success message
      setSuccess('Appointment scheduled successfully!')
      setFormData({ 
        userId: '', 
        visitorName: '',
        visitorEmail: '', 
        visitorPhone: '',
        company: '',
        purpose: '',
        host: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        timeDuration: '',
        appointmentLocation: '',
        note: ''
      })
      setSelectedUser(null)
      setSearchQuery('')
      
      onSubmit(appointmentData)
      
      // Auto close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSuccess('')
      }, 2000)
      
    } catch (error: any) {
      console.log('Failed to create appointment', error);
      setError(error?.message || 'Failed to create appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh]">
        <style dangerouslySetInnerHTML={{
          __html: `
            .modal-content::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        <div className="modal-content overflow-y-auto max-h-[90vh]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex items-center justify-between flex-shrink-0 p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Schedule New Appointment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* search user */}
          <div className="p-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Find existing user <span className="text-red-500">*</span>
              </label>
              <div className="relative flex gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value
                    setSearchQuery(value)
                    setSelectedUser(null)
                    setSearchError('')

                    if (searchTimeout) {
                      window.clearTimeout(searchTimeout)
                    }

                    const id = window.setTimeout(() => {
                      handleSearch(value)
                    }, 250)

                    setSearchTimeout(id)
                  }}
                  type="text"
                  placeholder="Search user by name, email, or phone..."
                  className="w-full px-2 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={handleAutoFill}
                  disabled={!selectedUser}
                  className={`px-4 py-2 rounded-md text-white ${selectedUser ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Autofill
                </button>
              </div>

              {searchError && <p className="text-xs text-red-500">{searchError}</p>}

              {searchResults.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-sm">
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectResult(user)}
                      className="w-full text-left px-3 py-2 hover:bg-slate-100"
                    >
                      <p className="font-medium text-black text-sm">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email || user.phoneNumber}</p>
                    </button>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="mt-2 flex items-center justify-between rounded-md border border-green-200 bg-green-50 px-3 py-2">
                  <div>
                    <p className="font-medium text-black text-sm p-1">Selected: {selectedUser.fullName}</p>
                    <p className="text-xs text-gray-600">{selectedUser.email || selectedUser.phoneNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={clearUserSelection}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visitor Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Visitor Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visitor Name *
                  </label>
                  <input
                    type="text"
                    name="visitorName"
                    placeholder='Visitor name'
                    value={formData.visitorName}
                    disabled={!!selectedUser}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="visitorEmail"
                    placeholder='Visit Email'
                    value={formData.visitorEmail}
                    disabled={!!selectedUser}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="visitorPhone"
                    placeholder='Visitor Phone Number'
                    value={formData.visitorPhone}
                    disabled={!!selectedUser}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder='Company or Organization'   
                    value={formData.company}
                    disabled={!!selectedUser}
                    onChange={handleChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose of Visit *
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  >
                    <option value="">Select Purpose</option>
                    <option value="Business Meeting">Business Meeting</option>
                    <option value="Interview">Interview</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Training">Training</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Host/Contact Person *
                  </label>
                  <select
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  >
                    <option value="">Select Host</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Mike Davis">Mike Davis</option>
                    <option value="Emily Chen">Emily Chen</option>
                    <option value="Tom Anderson">Tom Anderson</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Time *
                    </label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <select
                    name="timeDuration"
                    value={formData.timeDuration}
                    onChange={handleChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  >
                    <option value="">Select Duration</option>
                    <option value="0.5 hours">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="4 hours">4 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Location
                  </label>
                  <select
                    name="appointmentLocation"
                    value={formData.appointmentLocation}
                    onChange={handleChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    <option value="Conference Room A">Conference Room A</option>
                    <option value="Conference Room B">Conference Room B</option>
                    <option value="Meeting Room 1">Meeting Room 1</option>
                    <option value="Meeting Room 2">Meeting Room 2</option>
                    <option value="Presentation Hall">Presentation Hall</option>
                    <option value="HR Office">HR Office</option>
                    <option value="Reception">Reception</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                placeholder="Any additional information about the appointment..."
              />
            </div>

            {!selectedUser && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-600">
                  <span className="font-medium">User selection required:</span> Please search and select a user to schedule an appointment for.
                </p>
              </div>
            )}

            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className={`px-4 w-full py-2 border rounded-lg ${
                  isSubmitting 
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !selectedUser}
                className={`px-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                  isSubmitting || !selectedUser
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1A3263] text-white hover:bg-[#1A3263]/90'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scheduling...
                  </>
                ) : (
                  'Schedule Appointment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScheduleAppointmentModal