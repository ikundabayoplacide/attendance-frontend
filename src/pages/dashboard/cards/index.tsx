import { useState, useMemo } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaCreditCard, FaUserCheck, FaUserTimes, FaDownload, FaPrint } from 'react-icons/fa'
import { MdCardGiftcard } from 'react-icons/md'
import AddCardModal from '../../../components/modals/addCard'
import { useCreateCard, useDeleteCard, useGetCards, useUpdateCard } from '../../../hooks/useCard'
import { CardEntry } from '../../../api/card'
import { checkPermissions } from '../../../utils/helper'
import { useAuth } from '../../../hooks/useAuth'


interface NewCard {
  location: string
  branch: string
  cardNumber: string
  description: string
}

function Cards() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<CardEntry | null>(null)
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>('')
  const [newCard, setNewCard] = useState<NewCard>({ cardNumber: '', description: '', location: '', branch: '' })
  const [editCard, setEditCard] = useState<NewCard>({ cardNumber: '', description: '', location: '', branch: '' })
  const createCardMutation = useCreateCard();  
  const deleteCard = useDeleteCard();
  const updateCard=useUpdateCard();
  const { data: AllCards, isLoading, error } = useGetCards();
  const { currentUser } = useAuth()



  const filteredCards = useMemo(() => {
    if (!AllCards?.result) return [];
    return AllCards.result.filter((card: CardEntry) => {
      const matchesSearch = card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || card.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, AllCards])

  // Calculate stats
  const stats = useMemo(() => {
    if (!AllCards?.result) {
      return [
        { title: 'Total Cards', value: '0', icon: FaCreditCard, color: 'bg-blue-500' },
        { title: 'Available', value: '0', icon: FaUserCheck, color: 'bg-green-500' },
        { title: 'Assigned', value: '0', icon: FaUserTimes, color: 'bg-orange-500' },
        { title: 'Maintenance', value: '0', icon: MdCardGiftcard, color: 'bg-red-500' }
      ]
    }

    const total = AllCards.result.length
    const available = AllCards.result.filter((card: CardEntry) => card.status === 'available').length
    const assigned = AllCards.result.filter((card: CardEntry) => card.status === 'assigned').length
    const maintenance = AllCards.result.filter((card: CardEntry) => card.status === 'maintenance').length

    return [
      { title: 'Total Cards', value: total.toString(), icon: FaCreditCard, color: 'bg-blue-500' },
      { title: 'Available', value: available.toString(), icon: FaUserCheck, color: 'bg-green-500' },
      { title: 'Assigned', value: assigned.toString(), icon: FaUserTimes, color: 'bg-orange-500' },
      { title: 'Maintenance', value: maintenance.toString(), icon: MdCardGiftcard, color: 'bg-red-500' }
    ]
  }, [AllCards])

  const getStatusColor = (status: CardEntry['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'assigned': return 'bg-orange-100 text-orange-800'
      case 'maintenance': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: CardEntry['status']) => {
    switch (status) {
      case 'available': return <FaUserCheck className="text-green-600" size={14} />
      case 'assigned': return <FaUserTimes className="text-orange-600" size={14} />
      case 'maintenance': return <MdCardGiftcard className="text-red-600" size={14} />
      default: return <FaCreditCard className="text-gray-600" size={14} />
    }
  }

  const formatDateTime = (dateTime: string | null | undefined) => {
    if (!dateTime) return '-'
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleAddCard = async (cardData: NewCard) => {
    console.log('Adding new card:', cardData)
    try {
      await createCardMutation.mutateAsync({ ...cardData, status: 'available' });
      setNewCard({ cardNumber: '', description: '', location: '', branch: '' })
    } catch (error) {
      console.error('Error creating card:', error)
    }
    setNewCard({ cardNumber: '', description: '', location: '', branch: '' })
  }
  const handleDeleteCard = (card: CardEntry) => {
    setSelectedCard(card)
    setShowDeleteModal(true)
  }

  const confirmDeleteCard = async (id:string) => {
    if (selectedCard && deleteConfirmText === selectedCard.cardNumber) {
      console.log('Deleting card:', selectedCard.cardNumber)
       try {
        await deleteCard.mutateAsync(id);
       } catch (error) {
        console.error('Error deleting card:', error)
       }
      setShowDeleteModal(false)
      setSelectedCard(null)
      setDeleteConfirmText('')
    }
  }
  //Edit Card
  const handleEditCard = (card: CardEntry) => {
    setSelectedCard(card)
    setEditCard({
      cardNumber: card.cardNumber,
      description: card.description || '',
      location: card.location || '',
      branch: card.branch || ''
    })
    setShowEditModal(true)
  }

  const handleUpdateCard = async (cardData: NewCard) => {
    if (!selectedCard) return
    console.log('Updating card:', selectedCard.id, cardData)
    try {
      await updateCard.mutateAsync({ id: selectedCard.id, cardData })
      setShowEditModal(false)
      setSelectedCard(null)
      setEditCard({ cardNumber: '', description: '', location: '', branch: '' })
    } catch (error) {
      console.error('Error updating card:', error)
    }
  }


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <h1 className="!text-3xl font-bold text-gray-900">Cards</h1>
        <p className="text-gray-600">Manage visitor access cards and track their usage</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={20} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading cards...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error loading cards</div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Cards List</h2>
                {currentUser && checkPermissions(currentUser, 'card:create') && ( <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A3263] text-white rounded-lg hover:bg-[#2A4273] transition-colors"
                >
                  <FaPlus size={14} />
                  Add New Card
                </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-md relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cards or assigned users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3263] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaDownload size={14} />
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaPrint size={14} />
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Cards Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Card Number</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Location</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Branch</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Assigned To</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Assigned Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Last Used</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCards.map((card, index) => (
                    <tr key={card.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(card.status)}
                          <span className="font-medium text-gray-900">{card.cardNumber}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                          {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {card.location || '-'}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {card.branch || '-'}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {card.assignedTo || '-'}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {card.assignedAt || '-'}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {formatDateTime(card.lastUsed)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                         {currentUser&&checkPermissions(currentUser, 'card:read')&&(
                         <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                            <FaEye size={14} />
                          </button>
                         )}
                         
                         {currentUser&&checkPermissions(currentUser, 'card:update')&&( <button 
                            onClick={() => handleEditCard(card)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors" 
                            title="Edit Card"
                          >
                            <FaEdit size={14} />
                          </button>
                         )}
                         {currentUser&&checkPermissions(currentUser, 'card:delete')&&( <button 
                            onClick={() => handleDeleteCard(card)}
                            className="p-2 text-red-700 hover:text-red-600 transition-colors" 
                            title="Delete Card"
                          >
                            <FaTrash size={14} />
                          </button>
                         )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCards.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        <FaCreditCard className="mx-auto mb-4 text-gray-300" size={48} />
                        <p className="text-lg font-medium">No cards found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddCard={handleAddCard}
        newCard={newCard}
        setNewCard={setNewCard}
      />

      {/* Edit Card Modal */}
      <AddCardModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedCard(null)
          setEditCard({ cardNumber: '', description: '', location: '', branch: '' })
        }}
        onAddCard={handleUpdateCard}
        newCard={editCard}
        setNewCard={setEditCard}
        isEditMode={true}
        modalTitle="Edit Card"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCard && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Delete Card</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete card <span className="font-semibold">{selectedCard.cardNumber}</span>? 
                This action cannot be undone.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="font-semibold">{selectedCard.cardNumber}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={selectedCard.cardNumber}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedCard(null)
                  setDeleteConfirmText('')
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={()=>confirmDeleteCard(selectedCard.id)}
                disabled={deleteConfirmText !== selectedCard.cardNumber}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  deleteConfirmText === selectedCard.cardNumber
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards