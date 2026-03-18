import { useState } from 'react'
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa'

interface DeleteRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  roleName: string
}

function DeleteRoleModal({ isOpen, onClose, onConfirm, roleName }: DeleteRoleModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const isConfirmValid = confirmText === roleName

  const handleConfirm = () => {
    if (isConfirmValid) {
      onConfirm()
      setConfirmText('')
      onClose()
    }
  }

  const handleClose = () => {
    setConfirmText('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-red-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Role</h3>
            <p className="text-sm text-gray-600">This action cannot be undone</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-3">
            You are about to delete the role <span className="font-semibold text-red-600">"{roleName}"</span>. 
            This will permanently remove the role and all its associated permissions.
          </p>
          <p className="text-sm text-gray-700 mb-3">
            To confirm deletion, please type the role name below:
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`Type "${roleName}" to confirm`}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmValid}
            className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              isConfirmValid
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaTrash size={14} />
            Delete Role
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRoleModal