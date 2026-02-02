import { useState } from 'react'
import { FaBuilding, FaUsers, FaDollarSign, FaCalendarAlt, FaEye, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AddCustomer from '../../components/modals/AddCustomer'
import DeleteCustomer from '../../components/modals/deleteCustomer'

function Customers() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [planFilter, setPlanFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<{id: number, companyName: string} | null>(null)

  const handleAddCustomer = (customerData: any) => {
    console.log('Adding customer:', customerData)
  }

  const handleDeleteCustomer = (customerData: any) => {
    console.log('Deleting customer:', customerData)
    setShowDeleteModal(false)
    setSelectedCustomer(null)
  }

  const openDeleteModal = (customer: {id: number, companyName: string}) => {
    setSelectedCustomer(customer)
    setShowDeleteModal(true)
  }
 
  // Mock customer data
  const customers = [
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      contactPerson: 'John Smith',
      email: 'john@techcorp.com',
      plan: 'Enterprise',
      users: 45,
      monthlyRevenue: 900,
      status: 'Active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      companyName: 'StartupHub Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@startuphub.com',
      plan: 'Professional',
      users: 12,
      monthlyRevenue: 200,
      status: 'Active',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      companyName: 'Global Enterprises',
      contactPerson: 'Mike Wilson',
      email: 'mike@global.com',
      plan: 'Basic',
      users: 8,
      monthlyRevenue: 82,
      status: 'Cancelled',
      joinDate: '2023-11-10'
    }
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="!text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage your customer companies and subscriptions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500">
              <FaBuilding className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500">
              <FaDollarSign className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$47,850</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500">
              <FaUsers className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total End Users</p>
              <p className="text-2xl font-bold text-gray-900">3,247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500">
              <FaCalendarAlt className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-blue-800 flex items-center gap-2"
          >
            <FaPlus size={14} />
            Add New Customer
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.companyName}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.contactPerson}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.plan === 'Enterprise' ? 'bg-blue-100 text-blue-800' :
                      customer.plan === 'Professional' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${customer.monthlyRevenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigate(`/dashboard/customers/${customer.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal({id: customer.id, companyName: customer.companyName})}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddCustomer
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCustomer}
      />
      
      <DeleteCustomer
        isOpen={showDeleteModal}
        customerName={selectedCustomer?.companyName || ''}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedCustomer(null)
        }}
        onSubmit={handleDeleteCustomer}
      />
    </div>
  )
}

export default Customers