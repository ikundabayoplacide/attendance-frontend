import { useState } from 'react'
import { useGetCards } from '../../hooks/useCard'

interface Equipment {
  name: string
  serialNumber: string
}

interface Card {
  id: string
  cardNumber: string
  isAssigned: boolean
  assignedTo?: string
}

interface EquipmentModalProps {
  isOpen: boolean
  onClose: () => void
  equipmentList: Equipment[]
  setEquipmentList: (list: Equipment[]) => void
  cardList?: Card[]
  setCardList?: (list: Card[]) => void
  onSubmit?: (data: { equipments: Equipment[], card: Card | null }) => void
}

function EquipmentModal({ isOpen, onClose, equipmentList, setEquipmentList, cardList, onSubmit }: EquipmentModalProps) {
  const [selectedType, setSelectedType] = useState('')
  const [equipmentId, setEquipmentId] = useState('')
  const [customType, setCustomType] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  // card selection and filtering state
  const [selectedUnassigned, setSelectedUnassigned] = useState<string | null>(null)
  const [selectedAssigned, setSelectedAssigned] = useState<string | null>(null)
  const [searchUnassigned, setSearchUnassigned] = useState('')
  const [searchAssigned, setSearchAssigned] = useState('')
  const { data: cardsData, isLoading, isError } = useGetCards();

  // Convert CardEntry to Card format for compatibility
  const convertedCards: Card[] = cardsData?.result?.map(cardEntry => ({
    id: cardEntry.id,
    cardNumber: cardEntry.cardNumber,
    isAssigned: cardEntry.status === 'assigned',
    assignedTo: cardEntry.assignedAt ? 'Assigned' : undefined
  })) || []

  const currentCardList = cardList || convertedCards

  const availableEquipment = ['Laptop', 'Phone', 'Tablet', 'Camera', 'Car', 'Bike', 'Badge', 'Keys']

  if (!isOpen) return null

  const handleSelectType = (type: string) => {
    setSelectedType(type)
    setShowCustomInput(false)
    setCustomType('')
  }

  const handleAddCustom = () => {
    setShowCustomInput(true)
    setSelectedType('')
  }

  const handleAdd = () => {
    const type = showCustomInput ? customType : selectedType
    if (type.trim() && equipmentId.trim()) {
      if (editingIndex !== null) {
        const updated = [...equipmentList]
        updated[editingIndex] = { name: type.trim(), serialNumber: equipmentId.trim() }
        setEquipmentList(updated)
        setEditingIndex(null)
      } else {
        setEquipmentList([...equipmentList, { name: type.trim(), serialNumber: equipmentId.trim() }])
      }
      setSelectedType('')
      setCustomType('')
      setEquipmentId('')
      setShowCustomInput(false)
    }
  }

  const handleEdit = (index: number) => {
    const equipment = equipmentList[index]
    if (availableEquipment.includes(equipment.name)) {
      setSelectedType(equipment.name)
      setShowCustomInput(false)
    } else {
      setCustomType(equipment.name)
      setShowCustomInput(true)
    }
    setEquipmentId(equipment.serialNumber)
    setEditingIndex(index)
  }

  const handleRemove = (index: number) => {
    setEquipmentList(equipmentList.filter((_, i) => i !== index))
    if (editingIndex === index) {
      setEditingIndex(null)
      setSelectedType('')
      setCustomType('')
      setEquipmentId('')
      setShowCustomInput(false)
    }
  }
// function that will allow me to add information to user who is going to attend
const handleAddedInformationToAttendance=()=>{
  console.log("Equipment List:", equipmentList);
  console.log("Selected Assigned Card:", selectedAssigned);
  console.log("Selected Unassigned Card:", selectedUnassigned);
  
  // Get the selected card (either assigned or unassigned)
  const selectedCardId = selectedAssigned || selectedUnassigned;
  const selectedCardData = selectedCardId 
    ? currentCardList.find(card => card.id === selectedCardId)
    : null;
  
  console.log("Final selected card:", selectedCardData);
  console.log("Final equipment list:", equipmentList);
  
  const submissionData = {
    equipments: equipmentList,
    card: selectedCardData || null
  };
  
  if (onSubmit) {
    onSubmit(submissionData);
  }
  
  onClose();
}

  const unassignedCards = currentCardList.filter((card: Card) => !card.isAssigned)
  const assignedCards = currentCardList.filter((card: Card) => card.isAssigned)
  const filteredUnassigned = unassignedCards.filter(
    (c: Card) =>
      c.cardNumber.includes(searchUnassigned) ||
      (`BNR${c.cardNumber}`).includes(searchUnassigned)
  )
  const filteredAssigned = assignedCards.filter(
    (c: Card) =>
      c.cardNumber.includes(searchAssigned) ||
      (`BNR${c.cardNumber}`).includes(searchAssigned)
  )

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Visitor Equipment & Card Management</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="flex gap-6">
          {/* Equipment Section */}
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Equipment</h4>
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Available Equipment:</h5>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {availableEquipment.map((type) => (
              <button
                key={type}
                onClick={() => handleSelectType(type)}
                className={`px-3 py-2 text-sm rounded border-2 transition-colors ${
                  selectedType === type
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {showCustomInput ? (
            <div className="mb-3">
              <input
                type="text"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Enter custom equipment type..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          ) : (
            <button
              onClick={handleAddCustom}
              className="w-full px-3 py-2 text-sm border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              + Add Custom Equipment
            </button>
          )}

          {(selectedType || showCustomInput) && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                value={equipmentId}
                onChange={(e) => setEquipmentId(e.target.value)}
                placeholder="Enter ID/Plate/Serial number..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAdd()
                }}
              />
              <button
                onClick={handleAdd}
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                {editingIndex !== null ? 'Update Equipment' : 'Add Equipment'}
              </button>
            </div>
          )}
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Added Equipment:</h5>
          {equipmentList.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No equipment added yet</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {equipmentList.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-600">ID: {item.serialNumber}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
              </ul>
            )}
            </div>
          </div>

          {/* Card Management Section */}
          <div className="flex-1 border-l border-gray-200 pl-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Card Management</h4>

            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-gray-500">Loading cards...</div>
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-red-500">Error loading cards</div>
              </div>
            ) : (
              <div className="flex gap-4">
                {/* Activated / assigned cards */}
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Assigned Cards</h5>
                  <input
                    type="text"
                    value={searchAssigned}
                    onChange={e => setSearchAssigned(e.target.value)}
                    placeholder="Search..."
                    className="w-full mb-2 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                    {filteredAssigned.length === 0 ? (
                      <p className="p-2 text-sm text-gray-500 italic">No cards</p>
                    ) : (
                      filteredAssigned.map((card: Card) => (
                        <div
                          key={card.id}
                          className="flex items-center px-3 py-2 border-b last:border-b-0 hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="assigned"
                            value={card.id}
                            checked={selectedAssigned === card.id}
                            onChange={() => setSelectedAssigned(card.id)}
                            className="mr-2 text-blue-600"
                          />
                          <span className="font-medium text-gray-800">{card.cardNumber}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Unactivated / unassigned cards */}
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Active Cards</h5>
                  <input
                    type="text"
                    value={searchUnassigned}
                    onChange={e => setSearchUnassigned(e.target.value)}
                    placeholder="Search..."
                    className="w-full mb-2 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                    {filteredUnassigned.length === 0 ? (
                      <p className="p-2 text-sm text-gray-500 italic">No cards</p>
                    ) : (
                      filteredUnassigned.map((card: Card) => (
                        <div
                          key={card.id}
                          className="flex items-center px-3 py-2 border-b last:border-b-0 hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="unassigned"
                            value={card.id}
                            checked={selectedUnassigned === card.id}
                            onChange={() => setSelectedUnassigned(card.id)}
                            className="mr-2 text-blue-600"
                          />
                          <span className="font-medium text-gray-800">{card.cardNumber}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-14 py-2 bg-gray-200 text-gray-800 border  text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddedInformationToAttendance}
            className="px-14 py-2 bg-[#1A3263] text-white text-sm  rounded hover:bg-transparent hover:text-[#1A3263] hover:border transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default EquipmentModal