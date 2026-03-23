import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

interface DeleteAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
  isDeleting?: boolean
}

export default function DeleteAttendanceModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userName, 
  isDeleting = false 
}: DeleteAttendanceModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <FaExclamationTriangle className="text-red-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Attendance Record</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to delete the attendance record for{' '}
            <span className="font-semibold text-gray-900">{userName}</span>?
          </p>
          <p className="text-sm text-red-600 mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}