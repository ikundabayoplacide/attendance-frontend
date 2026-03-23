import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { AppointmentReschedule } from '../../api/appointment'

interface RescheduleAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (payload:AppointmentReschedule ) => void
  appointmentData: {
    id: string
    appointmentDate: string
    appointmentTime: string
    timeDuration: string
    reasonToReschedule: string
    appointmentLocation: string
  } | null
  isLoading: boolean
}

export default function RescheduleAppointmentModal({
  isOpen,
  onClose,
  onConfirm,
  appointmentData,
  isLoading
}: RescheduleAppointmentModalProps) {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    timeDuration: '',
    reasonToReschedule: '',
    appointmentLocation: ''
  })

  // Reschedule form data when appointment data changes
  useEffect(() => {
    if (appointmentData) {
      setFormData({
        appointmentDate: appointmentData.appointmentDate,
        appointmentTime: appointmentData.appointmentTime,
        timeDuration: appointmentData.timeDuration,
        reasonToReschedule: appointmentData.reasonToReschedule,
        appointmentLocation: appointmentData.appointmentLocation
      })
    }
  }, [appointmentData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: AppointmentReschedule = {
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      timeDuration: formData.timeDuration,
      reasonToReschedule: formData.reasonToReschedule,
      appointmentLocation: formData.appointmentLocation
    }

    onConfirm(payload);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Reschedule Appointment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent appearance-none"
              style={{ colorScheme: 'light' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Time
            </label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent appearance-none"
              style={{ colorScheme: 'light' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Duration
            </label>
            <select
              name="timeDuration"
              value={formData.timeDuration}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
            >
              <option value="">Select duration</option>
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Location
            </label>
            <input
              type="text"
              name="appointmentLocation"
              value={formData.appointmentLocation}
              onChange={handleChange}
              required
              placeholder="Meeting location"
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
            />
          </div>
          {/* Reason to Reschedule */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Reason to reschedule</label>
            <textarea
              name='reasonToReschedule'
              value={formData.reasonToReschedule}
              onChange={(e) => setFormData(prev => ({ ...prev, reasonToReschedule: e.target.value }))}
              placeholder='Enter reason for rescheduling'
              rows={3}
              className='w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent resize-none'
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#1A3263] text-white rounded-lg hover:bg-[#1A3263]/90 disabled:opacity-50"
            >
              {isLoading ? 'Rescheduling...' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}