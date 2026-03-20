
interface NewCard {
  cardNumber: string
  description: string
  location: string
  branch: string
}

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCard: (cardData: NewCard) => void
  newCard: NewCard
  setNewCard: (card: NewCard) => void
  isEditMode?: boolean
  modalTitle?: string
}

function AddCardModal({ isOpen, onClose, onAddCard, newCard, setNewCard, isEditMode = false, modalTitle }: AddCardModalProps) {
  const handleSubmit = () => {
    onAddCard(newCard)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{modalTitle || (isEditMode ? 'Edit Card' : 'Add New Card')}</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              value={newCard.cardNumber}
              onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              placeholder="Enter card number (e.g., CARD-006)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location(optional)</label>
            <input
            type="text"
            value={newCard.location}
            onChange={(e) => setNewCard({...newCard, location: e.target.value})}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
            placeholder="Enter card location (e.g., Entrance A)"
            />  
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch(optional)</label>
            <input 
             type="text"
             value={newCard.branch}
             onChange={(e)=>setNewCard({...newCard,branch:e.target.value})}
             className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
             placeholder="Enter branch name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
            <textarea
              value={newCard.description}
              onChange={(e) => setNewCard({...newCard, description: e.target.value})}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
              rows={3}
              placeholder="Enter card description or notes"
            />
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#1A3263] text-white rounded-lg hover:bg-[#2A4273] transition-colors"
          >
            {isEditMode ? 'Update Card' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCardModal