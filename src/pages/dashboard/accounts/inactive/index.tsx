import { useState } from 'react'
import { FaBuilding, FaUsers, FaDollarSign, FaCalendarAlt, FaEye, FaEdit, FaSearch, FaPlay, FaFilePdf, FaFileWord, FaPrint } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ExportReportModal from '../../../../components/modals/ExportReportModal'
import EditCustomer from '../../../../components/modals/EditCustomer'

function InactiveCustomers() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [planFilter, setPlanFilter] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'print'>('pdf')

  const handleExport = (type: 'pdf' | 'word' | 'print') => {
    setExportFormat(type)
    setShowExportModal(true)
  }


  const handleEditCustomer = (customerData: any) => {
    console.log('Updating customer:', customerData)
    setShowEditModal(false)
    setSelectedCustomer(null)
  }

  const handleGenerateReport = (selectedFields: string[], startDate: string, endDate: string, format: 'pdf' | 'word' | 'print') => {
    console.log('Generating report:', { selectedFields, startDate, endDate, format })
  }

  const exportFields = [
    { id: 'companyName', label: 'Company Name' },
    { id: 'contactPerson', label: 'Contact Person' },
    { id: 'email', label: 'Email' },
    { id: 'plan', label: 'Plan' },
    { id: 'users', label: 'Users' },
    { id: 'lastActivity', label: 'Last Activity' },
  ]

  // Mock inactive customer data
  const customers = [
    {
      id: 5,
      companyName: 'Dormant Corp',
      contactPerson: 'Lisa Brown',
      email: 'lisa@dormantcorp.com',
      plan: 'Basic',
      users: 5,
      monthlyRevenue: 0,
      status: 'Inactive',
      joinDate: '2023-08-15',
      lastActivity: '2024-01-10'
    },
    {
      id: 6,
      companyName: 'Paused Solutions',
      contactPerson: 'Tom Davis',
      email: 'tom@pausedsolutions.com',
      plan: 'Professional',
      users: 15,
      monthlyRevenue: 0,
      status: 'Inactive',
      joinDate: '2023-12-01',
      lastActivity: '2024-02-28'
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
          <h1 className="!text-2xl font-bold text-gray-900">Inactive Customers</h1>
          <p className="text-gray-600">Manage customers with inactive accounts</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gray-500">
              <FaBuilding className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Customers</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gray-500">
              <FaDollarSign className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lost Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$3,200</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gray-500">
              <FaUsers className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900">287</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500">
              <FaCalendarAlt className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reactivation Rate</p>
              <p className="text-2xl font-bold text-gray-900">23%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search inactive customers..."
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

          <div className="flex items-center gap-2">
            <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
              <FaFilePdf size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button onClick={() => handleExport('word')} className="flex items-center gap-2 px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              <FaFileWord size={16} />
              <span className="hidden sm:inline">Word</span>
            </button>
            <button onClick={() => handleExport('print')} className="flex items-center gap-2 px-3 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors">
              <FaPrint size={16} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>

         
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1A3263]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
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
                    {customer.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigate(`/dashboard/customers/${customer.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" onClick={() => {
                        setSelectedCustomer(customer)
                        setShowEditModal(true)
                      }}>
                        <FaEdit size={18} />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900" title="Reactivate" onClick={() => window.alert("ACTIVATION WILL COME VERY SOON")}>
                        <FaPlay size={18} />
                      </button>
                   
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleGenerateReport}
        fields={exportFields}
        exportFormat={exportFormat}
        title="Export Inactive Customers Report"
      />

        <EditCustomer
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedCustomer(null)
        }}
        onSubmit={handleEditCustomer}
        customerData={selectedCustomer}
      />
    </div>
  )
}

export default InactiveCustomers
