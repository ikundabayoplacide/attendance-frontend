import { useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import Button from "../../../components/ui/Button"
import AddEquipment from "../../../components/modals/addEquipment"

interface Equipment {
  id: number
  name: string
  category: string
  serialNumber: string
  purchaseDate: string
  status: "active" | "removed"
  location?: string
}

type EquipmentInput = {
  id?: number
  name: string
  category: string
  serialNumber: string
  purchaseDate: string
  status?: "active" | "removed"
  location?: string
}



function addEquipmentPage() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      category: "Computers",
      serialNumber: "SN123456",
      purchaseDate: "Jan 15, 2024",
      status: "active",
      location: "Office 1"
    },
    {
      id: 2,
      name: "Monitor LG 24inch",
      category: "Peripherals",
      serialNumber: "SN789012",
      purchaseDate: "Feb 01, 2024",
      status: "active",
      location: "Office 2"
    },
    {
      id: 3,
      name: "Printer HP LaserJet",
      category: "Printers",
      serialNumber: "SN345678",
      purchaseDate: "Dec 20, 2023",
      status: "removed",
      location: "Office 3"
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const handleAddEquipment = (newEquipment: EquipmentInput) => {
    const equipmentWithId: Equipment = {
      ...newEquipment,
      id: Math.max(...equipmentList.map(eq => eq.id), 0) + 1,
      status: newEquipment.status || "active"
    }
    setEquipmentList([...equipmentList, equipmentWithId])
  }
const handleEdit = (id: number) => {
    // TODO: Open edit modal or navigate to edit page
    console.log("Edit equipment:", id)
  }

  const handleDelete = (id: number) => {
    setShowDeleteConfirm(id)
  }

  const confirmDelete = (id: number) => {
    setEquipmentList(equipmentList.filter(eq => eq.id !== id))
    setShowDeleteConfirm(null)
  }

  const toggleStatus = (id: number) => {
    setEquipmentList(
      equipmentList.map(eq =>
        eq.id === id ? { ...eq, status: eq.status === "active" ? "removed" : "active" } : eq
      )
    )
  }

  const getStatusColor = (status: string | undefined) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }

  const getStatusIcon = (status: string | undefined) => {
    return status === "active"
      ? <FaCheckCircle className="text-green-600" />
      : <FaTimesCircle className="text-red-600" />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="!text-2xl font-bold text-black">Equipment Management</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex bg-[#1A3263] text-white rounded-lg hover:bg-blue-800 px-4 py-2">
          <FaPlus className="mr-2" /> Add Equipment
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentList.map(equipment => (
          <div
            key={equipment.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Card Header with Status */}
            <div
              className={`p-4 ${equipment.status === "active" ? "bg-blue-50" : "bg-gray-50"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {equipment.name}
                </h3>
                <div className="flex items-center gap-1">
                  {getStatusIcon(equipment.status)}
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      equipment.status
                    )}`}
                  >
                    {equipment.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{equipment.category}</p>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Serial Number</p>
                  <p className="text-sm font-medium text-gray-800">{equipment.serialNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Purchase Date</p>
                  <p className="text-sm font-medium text-gray-800">{equipment.purchaseDate}</p>
                </div>
                {equipment.location && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-gray-800">{equipment.location}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t pt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(equipment.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1A3263] text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  <FaEdit size={14} /> Edit
                </button>
                <button
                  onClick={() => toggleStatus(equipment.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                >
                  {equipment.status === "active" ? "Remove" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(equipment.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  <FaTrash size={14} /> Delete
                </button>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm === equipment.id && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Confirm Delete</h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <strong>{equipment.name}</strong>?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => confirmDelete(equipment.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {equipmentList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No equipment found. Add one to get started.</p>
        </div>
      )}

      {/* Add Equipment Modal */}
      <AddEquipment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEquipment}
      />
    </div>
  )
}

export default addEquipmentPage