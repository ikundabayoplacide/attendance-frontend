import { useState } from 'react'
import { FaTimes, FaSearch, FaCalendarAlt, FaClock, FaUser, FaBuilding } from 'react-icons/fa'
import { useGetAppointments } from '../../hooks/useAppointment'
import { AppointmentCreateRequest } from '../../api/appointment'



interface AppointmentsModalProps {
  isOpen: boolean
  onClose: () => void
}

function AppointmentsModal({ isOpen, onClose, }: AppointmentsModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'canceled' | 'onhold'>('all')
  
  // Fetch real appointment data
  const { data: appointmentData, isLoading, error } = useGetAppointments();

  if (!isOpen) return null

  const filteredAppointments = (appointmentData?.result || []).filter((appointment: AppointmentCreateRequest) => {
    // Map API fields to display fields for filtering
    const visitorName = appointment.userId || '' // You might need to fetch user details
    const hostName = appointment.host || ''
    const department = appointment.department || ''
    
    const matchesSearch = visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200'
      case 'onhold': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-[#1A3263] text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">All Appointments</h2>
            <span className="bg-[#1A3263] text-white text-sm rounded-full px-3 py-1 font-bold">
              {filteredAppointments.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by visitor name, host, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white pr-8"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
                <option value="onhold">On Hold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-[#1A3263] rounded-full mb-4"></div>
              <p className="text-lg">Loading appointments...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              <FaCalendarAlt className="mx-auto text-4xl mb-4 text-red-300" />
              <p className="text-lg">Error loading appointments</p>
              <p className="text-sm">Please try again later</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FaCalendarAlt className="mx-auto text-4xl mb-4 text-gray-300" />
              <p className="text-lg">No appointments found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment, index) => (
                <div key={appointment.userId + index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      
                      <div className=" flex items-between gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {appointment.user?.fullName} {/* You might want to fetch actual user name */}
                        </h3> <span className={`px-2 py-1 rounded-full text-xs font-medium rounded border ${getStatusColor(appointment.status || 'pending')}`}>
                          {(appointment.status).charAt(0).toUpperCase() + (appointment.status).slice(1)}
                        </span> 
                        </div>
                        <h3 className="text-lg mb-1 font-semibold text-gray-800">
                          {appointment.user?.phoneNumber} {/* You might want to fetch actual user name */}
                        </h3> 
                       
                      
                    
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FaUser className="text-gray-400" />
                            <span>Host: <strong>{appointment.host}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaBuilding className="text-gray-400" />
                            <span>Department: <strong>{appointment.department}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="text-gray-400" />
                            <span>Time: <strong>{appointment.appointmentTime}</strong></span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            <span>Date: <strong>{appointment.appointmentDate}</strong></span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration: </span>
                            <strong>{appointment.timeDuration}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500">Company: </span>
                            <strong>{appointment.company}</strong>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Purpose: </span>
                        <span className="text-gray-700">{appointment.purpose}</span>
                      </div>
                      
                      {appointment.note && (
                        <div className="mt-2">
                          <span className="text-gray-500 text-sm">Note: </span>
                          <span className="text-gray-700">{appointment.note}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons for confirmed/pending appointments */}
                    {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => {
                            // Handle check-in
                            console.log('Checking in appointment:', appointment.userId)
                            alert(`Appointment for ${appointment.userId} checked in successfully!`)
                          }}
                          className="px-3 py-1.5 bg-green-800 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          ✓ Check In
                        </button>
                        <button
                          onClick={() => {
                            // Handle cancel
                            console.log('Cancelling appointment:', appointment.userId)
                            alert(`Appointment for ${appointment.userId} cancelled.`)
                          }}
                          className="px-3 py-1.5 bg-red-700 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredAppointments.length} of {appointmentData?.result?.length || 0} appointments
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsModal