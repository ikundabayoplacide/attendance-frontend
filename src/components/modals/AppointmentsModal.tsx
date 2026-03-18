import { useState } from 'react'
import { FaTimes, FaSearch, FaCalendarAlt, FaClock, FaUser, FaBuilding } from 'react-icons/fa'

interface Appointment {
  id: string
  visitorName: string
  hostName: string
  department: string
  appointmentTime: string
  date: string
  purpose: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  visitorPhone: string
  visitorCompany: string
}

interface AppointmentsModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    visitorName: 'UWIMANA Jean Claude',
    hostName: 'MUKAMANA Alice',
    department: 'ICT',
    appointmentTime: '2:00 PM - 3:00 PM',
    date: '2024-02-20',
    purpose: 'Technical meeting for system upgrade',
    status: 'confirmed',
    visitorPhone: '+250788123456',
    visitorCompany: 'Tech Solutions Ltd'
  },
  {
    id: '2',
    visitorName: 'NSHUTI Ngabo',
    hostName: 'KEZA Shania',
    department: 'HR',
    appointmentTime: '10:00 AM - 11:00 AM',
    date: '2024-02-20',
    purpose: 'Job interview discussion',
    status: 'pending',
    visitorPhone: '+250782471145',
    visitorCompany: 'SAN TECH'
  },
  {
    id: '3',
    visitorName: 'MUTESI Grace',
    hostName: 'BIZIMANA Paul',
    department: 'Finance',
    appointmentTime: '3:30 PM - 4:30 PM',
    date: '2024-02-20',
    purpose: 'Budget review meeting',
    status: 'completed',
    visitorPhone: '+250785490284',
    visitorCompany: 'Finance Corp'
  },
  {
    id: '4',
    visitorName: 'HABIMANA Eric',
    hostName: 'UWASE Marie',
    department: 'Operations',
    appointmentTime: '9:00 AM - 10:00 AM',
    date: '2024-02-21',
    purpose: 'Project planning session',
    status: 'confirmed',
    visitorPhone: '+250788567890',
    visitorCompany: 'Operations Plus'
  }
]

function AppointmentsModal({ isOpen, onClose }: AppointmentsModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')

  if (!isOpen) return null

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
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
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FaCalendarAlt className="mx-auto text-4xl mb-4 text-gray-300" />
              <p className="text-lg">No appointments found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {appointment.visitorName}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FaUser className="text-gray-400" />
                            <span>Host: <strong>{appointment.hostName}</strong></span>
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
                            <span>Date: <strong>{appointment.date}</strong></span>
                          </div>
                          <div>
                            <span className="text-gray-500">Phone: </span>
                            <strong>{appointment.visitorPhone}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500">Company: </span>
                            <strong>{appointment.visitorCompany}</strong>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Purpose: </span>
                        <span className="text-gray-700">{appointment.purpose}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons for confirmed/pending appointments */}
                    {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => {
                            // Handle check-in
                            console.log('Checking in appointment:', appointment.id)
                            alert(`Appointment for ${appointment.visitorName} checked in successfully!`)
                          }}
                          className="px-3 py-1.5 bg-green-800 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          ✓ Check In
                        </button>
                        <button
                          onClick={() => {
                            // Handle cancel
                            console.log('Cancelling appointment:', appointment.id)
                            alert(`Appointment for ${appointment.visitorName} cancelled.`)
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
              Showing {filteredAppointments.length} of {mockAppointments.length} appointments
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsModal