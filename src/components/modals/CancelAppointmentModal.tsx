import { useState } from 'react'
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

interface CancelAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  appointmentTitle: string
  isLoading?: boolean
}

export default function CancelAppointmentModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  appointmentTitle, 
  isLoading = false 
}: CancelAppointmentModalProps) {
  const [cancelReason, setCancelReason] = useState('')

  const handleConfirm = () => {
    if (cancelReason.trim()) {
      onConfirm(cancelReason.trim())
      setCancelReason('')
    }
  }

  const handleClose = () => {
    setCancelReason('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <FaExclamationTriangle className="text-orange-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Cancel Appointment</h3>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600" disabled={isLoading}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to cancel the appointment: <strong>{appointmentTitle}</strong>?
          </p>
          <div>
            <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 mb-2">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cancelReason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Please provide a reason for cancellation..."
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Keep Appointment
          </button>
          <button
            onClick={handleConfirm}
            disabled={!cancelReason.trim() || isLoading}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Canceling...
              </>
            ) : (
              'Cancel Appointment'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}