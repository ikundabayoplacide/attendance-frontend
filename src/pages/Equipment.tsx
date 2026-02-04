import { useState } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import EquipmentDetailsModal from '../components/modals/EquipmentDetailsModal';

function Equipment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState<{name: string, equipment: string[]} | null>(null);
    const equipmentData = [
        {
            id: 1,
            name: "John Doe",
            phone: "+250788123456",
            entryTime: "Feb 04, 2024 - 09:15 AM",
            exitTime: "Feb 04, 2024 - 05:30 PM",
            equipmentCount: 2,
            equipment: ["Laptop", "Phone"]
        },
        {
            id: 2,
            name: "Jane Smith",
            phone: "+250788654321",
            entryTime: "Feb 04, 2024 - 08:45 AM",
            exitTime: "Feb 04, 2024 - 04:15 PM",
            equipmentCount: 3,
            equipment: ["Laptop", "Phone", "Tablet"]
        },
        {
            id: 3,
            name: "Mike Johnson",
            phone: "+250788987654",
            entryTime: "Feb 03, 2024 - 10:20 AM",
            exitTime: "Feb 03, 2024 - 06:00 PM",
            equipmentCount: 2,
            equipment: ["Phone", "Camera"]
        },
        {
            id: 4,
            name: "Sarah Wilson",
            phone: "+250788456789",
            entryTime: "Feb 03, 2024 - 07:30 AM",
            exitTime: "Feb 03, 2024 - 03:45 PM",
            equipmentCount: 3,
            equipment: ["Laptop", "Phone", "Charger"]
        }
    ];

    const handleViewEquipment = (visitor: any) => {
        setSelectedVisitor({ name: visitor.name, equipment: visitor.equipment });
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="!text-2xl font-bold text-gray-800">Equipment Tracking</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search visitors..."
                            className="pl-10 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Entry Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Exit Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Equipment
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {equipmentData.map((visitor) => (
                            <tr key={visitor.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{visitor.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{visitor.entryTime}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{visitor.exitTime}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FaEye 
                                            className="text-blue-600 cursor-pointer hover:text-blue-800" 
                                            size={16}
                                            onClick={() => handleViewEquipment(visitor)}
                                        />
                                        <span className="text-sm font-medium text-gray-900">{visitor.equipmentCount}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                    Showing 1 to {equipmentData.length} of {equipmentData.length} entries
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-black border border-gray-300 rounded text-sm hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        1
                    </button>
                    <button className="px-3 py-1 text-black border border-gray-300 rounded text-sm hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>

            <EquipmentDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                visitorName={selectedVisitor?.name || ''}
                equipmentList={selectedVisitor?.equipment || []}
            />
        </div>
    );
}

export default Equipment;